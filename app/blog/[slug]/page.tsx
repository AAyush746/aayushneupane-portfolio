import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, journal } from "@/data/journal";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { BoardButton } from "@/components/ui/BoardButton";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: { title: post.title, description: post.description },
  };
}

/** Minimal, safe markdown: paragraphs, ## headings, `code`, **bold**. */
function renderBody(body: string) {
  return body.split(/\n{2,}/).map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="t-display-3 mt-[clamp(2rem,5vh,3.5rem)] mb-4 border-b border-line pb-3 !text-[clamp(1.2rem,2.4vw,1.9rem)]"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    return (
      <p key={i} className="t-body mb-5 max-w-[68ch]">
        {trimmed.split("\n").map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {formatInline(line)}
          </span>
        ))}
      </p>
    );
  });
}

function formatInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
      return (
        <code
          key={i}
          className="border border-line bg-ink-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-ivory">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = journal.findIndex((p) => p.slug === post.slug);
  const next = journal[(idx + 1) % journal.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: "Aayush Neupane" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="shell border-b border-line pt-[clamp(7rem,16vh,11rem)] pb-[clamp(2.5rem,7vh,4rem)]">
          <div className="mb-[clamp(2rem,6vh,4rem)] flex flex-wrap items-baseline justify-between gap-4">
            <Link href="/blog" className="t-meta link-underline hover:text-accent">
              ← FIELD NOTES
            </Link>
            <span className="font-mono text-[0.7rem] tracking-[0.24em] text-accent">
              {post.category}
            </span>
          </div>

          <h1 className="t-display-1 max-w-[16ch]">
            <LineReveal lines={[post.title]} lineClassName="block" step={0} />
          </h1>

          <Reveal delay={260}>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line pt-5">
              <span className="t-meta">
                {new Date(post.date).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="t-meta !text-ivory-3">{post.readingTime}</span>
              <span className="t-meta !text-ivory-3">
                AAYUSH NEUPANE · KATHMANDU
              </span>
            </div>
          </Reveal>
        </header>

        <div className="shell py-[clamp(2.5rem,7vh,5rem)]">
          <Reveal>
            <p className="t-display-3 mb-[clamp(2rem,5vh,3.5rem)] max-w-[42ch] !text-[clamp(1.1rem,2.2vw,1.7rem)] italic text-ivory-2">
              {post.description}
            </p>
          </Reveal>

          <div className="max-w-[72ch]">{renderBody(post.body)}</div>

          <nav className="mt-[clamp(3rem,8vh,5rem)] flex items-center justify-between border-t border-line pt-6">
            <Link href="/blog" className="t-meta link-underline hover:text-accent">
              ← ALL NOTES
            </Link>
            <Link
              href={`/blog/${next.slug}`}
              className="group flex items-baseline gap-3 text-right"
              data-cursor-label="NEXT"
            >
              <span className="t-meta !text-ivory-3">NEXT</span>
              <span className="t-display-3 !text-[clamp(1rem,2vw,1.5rem)] transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </span>
            </Link>
          </nav>

          <div className="mt-10">
            <BoardButton label="RETURN TO THE BOARD" />
          </div>
        </div>
      </article>
    </>
  );
}
