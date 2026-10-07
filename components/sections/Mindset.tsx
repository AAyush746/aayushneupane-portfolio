import { profile } from "@/data/profile";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

export function Mindset() {
  const { left, right, headline } = profile.mindset;

  return (
    <section id="mindset" className="relative border-t border-line py-[clamp(5rem,14vh,9rem)]">
      <div className="shell">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">06 — MINDSET</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">F7</span>
        </div>

        <h3 className="mb-[clamp(2.5rem,7vh,5rem)] max-w-[min(100%,38rem)]">
          <LineReveal lines={[headline]} className="t-display-2" lineClassName="italic" />
        </h3>

        <div className="grid gap-y-8">
          <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-8 lg:grid">
            <div className="t-eyebrow text-right !text-ivory">{left.title}</div>
            <div className="font-mono text-[0.7rem] text-accent">×</div>
            <div className="t-eyebrow !text-ivory">{right.title}</div>
          </div>

          <ul>
            {left.rows.map((row, i) => (
              <Reveal key={row} delay={i * 80} as="li">
                <div className="grid items-center gap-2 border-t border-line py-[clamp(0.9rem,2.4vh,1.6rem)] grid-cols-[1fr_auto_1fr] lg:gap-8">
                  <span className="t-display-3 text-right !text-[clamp(1.05rem,2vw,1.75rem)]">
                    {row}
                  </span>
                  <span className="font-mono text-[0.65rem] text-ivory-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="t-display-3 !text-[clamp(1.05rem,2vw,1.75rem)] text-ivory-2">
                    {right.rows[i]}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={200}>
          <p className="t-meta mt-8 text-center">
            ONE LOOP — OBSERVE THE BOARD, OBSERVE THE NETWORK
          </p>
        </Reveal>
      </div>
    </section>
  );
}
