import Link from "next/link";
import { journal } from "@/data/journal";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

export function Journal() {
  return (
    <section id="journal" className="relative border-t border-line py-[clamp(5rem,14vh,9rem)]">
      <div className="shell">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">10 — JOURNAL</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">
            NOTES FROM THE FILE
          </span>
        </div>

        <h3 className="mb-[clamp(2rem,6vh,4rem)]">
          <LineReveal lines={["FIELD", "NOTES."]} className="t-display-2" step={100} />
        </h3>

        <ul>
          {journal.map((post, i) => (
            <Reveal key={post.slug} delay={i * 90} as="li">
              <Link
                href={`/blog/${post.slug}`}
                className="group grid items-baseline gap-3 border-t border-line py-[clamp(1.4rem,3.5vh,2.4rem)] transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-4 lg:grid-cols-[10rem_1fr_auto]"
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
            </Reveal>
          ))}
        </ul>

        <div className="border-t border-line pt-4">
          <span className="t-meta text-ivory-3">MORE MOVES COMING.</span>
        </div>
      </div>
    </section>
  );
}
