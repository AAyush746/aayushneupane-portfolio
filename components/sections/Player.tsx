import Image from "next/image";
import { profile, skills } from "@/data/profile";
import { LineReveal, Reveal } from "@/components/ui/Reveal";

export function Player() {
  return (
    <section id="player" className="relative border-t border-line py-[clamp(5rem,14vh,9rem)]">
      <div className="shell">
        <div className="mb-[clamp(2.5rem,7vh,5rem)] flex items-baseline justify-between">
          <h2 className="t-eyebrow">03 — THE PLAYER</h2>
          <span className="font-mono text-[0.7rem] tracking-[0.2em] text-accent">B2</span>
        </div>

        <div className="grid items-start gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <Reveal className="lg:sticky lg:top-28">
            <figure className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-line bg-ink-2">
                <Image
                  src="/assets/images/profile.jpg"
                  alt={`${profile.name} — portrait`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                <span className="absolute bottom-4 left-4 font-mono text-[0.65rem] tracking-[0.2em] text-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  1…Nf6
                </span>
              </div>
              <figcaption className="t-meta mt-3 flex justify-between">
                <span>PORTRAIT</span>
                <span>{profile.location.toUpperCase()}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <h3 className="mb-[clamp(1.5rem,4vh,3rem)]">
              <LineReveal
                lines={profile.player.lines}
                className="t-display-2"
                lineClassName="text-ivory"
                step={110}
              />
            </h3>

            <Reveal delay={200}>
              <div className="t-body max-w-xl whitespace-pre-line">
                {profile.player.body}
              </div>
            </Reveal>

            <div className="mt-[clamp(2rem,6vh,4rem)]">
              <Reveal>
                <div className="t-eyebrow mb-4">REPERTOIRE</div>
              </Reveal>
              <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {Object.entries(skills).map(([group, list], i) => (
                  <Reveal key={group} delay={i * 70}>
                    <div className="border-t border-line pt-3">
                      <div className="t-meta mb-1.5 text-accent">{group}</div>
                      <p className="text-[0.8rem] leading-relaxed text-ivory-2">{list}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
