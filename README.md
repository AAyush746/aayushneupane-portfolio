# Aayush Neupane's Personal Website

Live at [aayushneupane1.com.np](https://aayushneupane1.com.np).

The site is a chess-themed personal portfolio: floating chess pieces rendered on a
canvas (small in the distance, large up close), a monochrome board palette, project
cards and a career timeline, plus a print-friendly CV page.

## Frameworks and packages used

- [Zola](https://getzola.org/) (templates with [Tera](https://keats.github.io/tera/))
- [dart-sass](https://sass-lang.com/) for the stylesheets
- A hand-rolled `<canvas>` renderer for the floating chess pieces (no JS libraries)

## Local development

Requires `zola` and `sass` on your `PATH`:

```bash
zola serve
```

Or build exactly like the deploy pipeline does (installs dart-sass if missing):

```bash
bash build.sh
```

## Layout

- `content/_index.md` — homepage copy, socials, projects and timeline
- `content/cv/_index.md` — CV / résumé content
- `templates/macros/chess.html` — the floating chess pieces background
- `sass/` — stylesheets; `_variables.scss` holds the monochrome board palette

## License

The code is licensed under the [MIT license](./LICENSE).