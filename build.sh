#!/usr/bin/env bash
# Builds the site for deployment (Vercel, Netlify or a bare machine).
#
# `compile_sass = true` in config.toml needs dart-sass on PATH, and the templates
# are pinned to zola 0.22.1 (0.23 renamed Tera macro syntax), so both tools are
# fetched when missing instead of trusting whatever the host image ships.
set -euo pipefail

ZOLA_VERSION="${ZOLA_VERSION:-0.22.1}"
SASS_VERSION="${SASS_VERSION:-1.83.4}"

if ! command -v zola >/dev/null 2>&1; then
  echo "zola not found, installing ${ZOLA_VERSION}"
  zola_dir="$(mktemp -d)"
  curl -sSL "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz" \
    | tar xz -C "${zola_dir}"
  export PATH="${zola_dir}:${PATH}"
fi

if ! command -v sass >/dev/null 2>&1; then
  echo "sass not found, installing dart-sass ${SASS_VERSION}"
  sass_dir="$(mktemp -d)"
  curl -sSL "https://github.com/sass/dart-sass/releases/download/${SASS_VERSION}/dart-sass-${SASS_VERSION}-linux-x64.tar.gz" \
    | tar xz -C "${sass_dir}"
  export PATH="${sass_dir}/dart-sass:${PATH}"
fi

args=(--minify)

# Vercel only exposes VERCEL_URL for previews; production keeps the real domain.
if [ "${VERCEL_ENV:-}" = "preview" ] && [ -n "${VERCEL_URL:-}" ]; then
  args+=(--base-url "https://${VERCEL_URL}")
fi

exec zola build "${args[@]}" "$@"