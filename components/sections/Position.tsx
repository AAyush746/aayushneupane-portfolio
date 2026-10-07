import { profile } from "@/data/profile";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

export function Position() {
  return (
    <section
      id="position"
      className="relative border-t border-line py-[clamp(5rem,14vh,9rem)]"
    >
      <div className="shell">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">02 — POSITION</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">E4</span>
        </div>

        <h3 className="mb-[clamp(2rem,6vh,4rem)] max-w-[min(100%,44rem)]">
          <LineReveal lines={[profile.statement.lead]} className="t-display-2" />
        </h3>

        <div className="grid gap-[clamp(2rem,5vw,5rem)] border-t border-line pt-[clamp(1.5rem,4vh,3rem)] lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="t-body max-w-sm">{profile.statement.body}</p>
          </Reveal>

          <ol className="grid grid-cols-2 gap-x-8 gap-y-[clamp(1rem,3vh,2rem)] sm:grid-cols-3 lg:grid-cols-5">
            {profile.statement.steps.map((step, i) => (
            <Reveal key={step} delay={i * 90} as="li">
              <div className="border-t border-line pt-4">
                <span className="t-meta block text-ivory-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                  <span className="t-display-3 mt-2 block leading-[1.15]">{step}</span>
              </div>
            </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
