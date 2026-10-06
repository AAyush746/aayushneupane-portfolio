+++
title = "My First Vlog"
description = "An example post showing how to write and publish on this blog."

[taxonomies]
tags = ["personal"]
+++

This is an example post. Everything above the `<!-- more -->` marker becomes the
short preview shown on the blog list — use it as a one or two sentence teaser.
<!-- more -->

Welcome to my blog! This is where I'll share what I'm working on and learning.

## How to edit this post

Open `content/blog/2026-10-06-my-first-vlog/index.md` and replace the text with
your own. A few things to know:

- The **folder name must start with the date** (`YYYY-MM-DD-slug`). The slug
  becomes the page URL, so `2026-10-06-my-first-vlog` lives at `/blog/my-first-vlog/`.
- Change the `title` and `description` in the front matter above.
- Add or remove tags in the `tags` list.
- Put images in this same folder and reference them with normal Markdown, for
  example: `![a caption](screenshot.png)`

## Adding a new post

Create a new folder (or a single `.md` file) in `content/blog/` whose name starts
with the date, then run `zola serve`. It shows up on the blog automatically.

Happy writing!