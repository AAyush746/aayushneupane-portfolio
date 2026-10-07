#!/usr/bin/env bash
# Builds the site for deployment (Vercel, Netlify or a bare machine).
#
# zola is always installed from the pinned release: host images ship whatever
# version they happened to cache (Vercel's Zola preset ships one that rejects
# `zola build --minify`), and the templates need 0.22.1's Tera syntax.
# `compile_sass = true` in config.toml additionally needs dart-sass on PATH.
set -euo pipefail

ZOLA_VERSION="${ZOLA_VERSION:-0.22.1}"
SASS_VERSION="${SASS_VERSION:-1.83.4}"

zola_dir="$(mktemp -d)"
echo "installing zola ${ZOLA_VERSION}"
curl -fsSL "https://github.com/getzola/zola/releases/download/v${ZOLA_VERSION}/zola-v${ZOLA_VERSION}-x86_64-unknown-linux-musl.tar.gz" \
  | tar xz -C "${zola_dir}"
export PATH="${zola_dir}:${PATH}"

if ! command -v sass >/dev/null 2>&1; then
  echo "installing dart-sass ${SASS_VERSION}"
  sass_dir="$(mktemp -d)"
  curl -fsSL "https://github.com/sass/dart-sass/releases/download/${SASS_VERSION}/dart-sass-${SASS_VERSION}-linux-x64.tar.gz" \
    | tar xz -C "${sass_dir}"
  export PATH="${sass_dir}/dart-sass:${PATH}"
fi

args=(--minify)

# Vercel only exposes VERCEL_URL for previews; production keeps the real domain.
if [ "${VERCEL_ENV:-}" = "preview" ] && [ -n "${VERCEL_URL:-}" ]; then
  args+=(--base-url "https://${VERCEL_URL}")
fi

exec zola build "${args[@]}" "$@"