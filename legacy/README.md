# Legacy Zola site

The original static site (Zola 0.22.1 + Tera templates + SCSS) that this
repository shipped before the Next.js rewrite. It is kept for reference and
recovery only — the live site is now the Next.js app at the repository root.

## Rebuild it locally

```bash
./build.sh        # installs pinned zola + dart-sass, then runs `zola build --minify`
./build.sh serve  # any extra args are passed straight to zola (e.g. `serve`)
```

`config.toml`, `templates/`, `sass/`, `content/` and `static/` are untouched.
Deployment config for the old site lives here too (`netlify.toml`,
`vercel.json`) and is no longer used.

## Content ported to the new site

| Legacy source                         | New location                    |
| ------------------------------------- | ------------------------------- |
| `content/_index.md` (hero, projects)  | `data/profile.ts`, `data/projects.ts` |
| `content/_index.md` (timeline)        | `data/experience.ts`            |
| `content/cv/_index.md`                | `data/cv.ts`                    |
| `content/blog/…/index.md`             | `data/journal.ts`               |
| `static/assets/**`                    | `public/assets/**`              |
| `content/impossiblelist.md`           | not ported (inherited template content, outside the new IA) |
