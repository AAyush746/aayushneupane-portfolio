import type { Metadata } from "next";
import Link from "next/link";
import { journal } from "@/data/journal";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Essays and notes on cybersecurity, chess, engineering and project work by Aayush Neupane.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <article>
      <header className="shell border-b border-line pt-[clamp(7rem,16vh,11rem)] pb-[clamp(2.5rem,7vh,4rem)]">
        <div className="mb-[clamp(2rem,6vh,4rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">FIELD NOTES</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.24em] text-accent">
            {String(journal.length).padStart(2, "0")} ENTRIES
          </span>
        </div>

        <h1 className="t-display-1 max-w-[12ch]">
          <LineReveal lines={["THINKING", "OUT LOUD."]} lineClassName="block" step={140} />
        </h1>

        <Reveal delay={320}>
          <p className="t-body mt-6 max-w-[52ch]">
            Notes from the file — cybersecurity, chess, engineering, and whatever
            I am currently trying to understand.
          </p>
        </Reveal>
      </header>

      <div className="shell py-[clamp(2rem,6vh,4rem)]">
        <ul>
          {journal.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90}>
              <li>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid items-baseline gap-3 border-b border-line py-[clamp(1.6rem,4vh,2.6rem)] transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-4 lg:grid-cols-[10rem_1fr_auto]"
                >
                  <span className="t-meta !text-ivory-3">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span>
                    <span className="t-display-3 block transition-colors duration-300 group-hover:text-accent">
                      {post.title}
                    </span>
                    <span className="t-body mt-1 block max-w-[56ch] text-[0.9rem]">
                      {post.description}
                    </span>
                  </span>

                  <span className="t-meta !text-ivory-3 lg:text-right">
                    {post.category} · {post.readingTime}
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </article>
  );
}
