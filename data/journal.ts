export type JournalPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  body: string;
};

export const journal: JournalPost[] = [
  {
    slug: "my-first-vlog",
    title: "My First Vlog",
    description: "An example post showing how to write and publish on this blog.",
    date: "2026-10-06",
    readingTime: "1 min read",
    category: "LEARNING",
    tags: ["personal"],
    body: `This is an example post. Everything above the marker becomes the short preview shown on the blog list — use it as a one or two sentence teaser.

Welcome to my blog! This is where I'll share what I'm working on and learning.

## How to edit this post

Edit \`data/journal.ts\` and replace the text with your own. A few things to know:

- The **slug** becomes the page URL, so \`my-first-vlog\` lives at \`/blog/my-first-vlog\`.
- Change the \`title\`, \`description\` and \`category\` fields.
- Add or remove tags in the \`tags\` array.

## Adding a new post

Add another object to the \`journal\` array in \`data/journal.ts\`. It shows up on the journal section and on \`/blog\` automatically.

Happy writing!`,
  },
];

export const getPost = (slug: string) => journal.find((p) => p.slug === slug);
