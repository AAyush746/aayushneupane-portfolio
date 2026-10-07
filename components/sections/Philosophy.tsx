import { profile } from "@/data/profile";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative border-t border-line py-[clamp(5rem,16vh,11rem)]"
    >
      <div className="shell">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">09 — PHILOSOPHY</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">H4</span>
        </div>

        <h3 className="mx-auto max-w-[min(100%,48rem)] text-center">
          <LineReveal
            lines={profile.philosophy.quote}
            className="t-display-2"
            lineClassName="block"
            step={120}
          />
        </h3>

        <Reveal delay={400}>
          <p className="t-meta mt-8 text-center">AAYUSH NEUPANE — WORKING PRINCIPLE</p>
        </Reveal>

        <div className="mt-[clamp(3rem,9vh,6rem)] grid gap-x-10 gap-y-8 border-t border-line pt-[clamp(1.5rem,4vh,3rem)] sm:grid-cols-2 lg:grid-cols-5">
          {profile.philosophy.values.map((v, i) => (
            <Reveal key={v.index} delay={i * 80}>
              <div>
                <div className="t-meta mb-3 text-accent">{v.index}</div>
                <div className="t-display-3 !text-[clamp(1.2rem,1.8vw,1.6rem)]">
                  {v.name}
                </div>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-ivory-2">
                  {v.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
