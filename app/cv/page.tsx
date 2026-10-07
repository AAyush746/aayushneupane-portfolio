import type { Metadata } from "next";
import Image from "next/image";
import { profile, skills } from "@/data/profile";
import { projects } from "@/data/projects";
import { timeline } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { BoardButton } from "@/components/ui/BoardButton";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Résumé of Aayush Neupane — Computer Engineering student, cybersecurity, intrusion detection and applied cryptography, CTF and chess competitor.",
  alternates: { canonical: "/cv" },
  openGraph: {
    title: "Curriculum Vitae — Aayush Neupane",
    description:
      "Cybersecurity engineering student. Intrusion detection, packet analysis, applied cryptography. 1st place CTF, 3rd place chess.",
    url: "/cv",
  },
};

function Section({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-[clamp(2rem,5vh,3.5rem)]">
      <div className="mb-[clamp(1.25rem,3vh,2rem)] flex items-baseline gap-5">
        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent">
          {index}
        </span>
        <h2 className="t-eyebrow !text-ivory">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function CvPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Computer Engineering Student & Cybersecurity Engineer",
    email: `mailto:${profile.socials.email}`,
    url: "https://aayushneupane-portfolio.vercel.app",
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.university },
    knowsAbout: Object.keys(skills).concat(["Cybersecurity", "Chess"]),
    sameAs: [profile.socials.github, profile.socials.linkedin],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="shell pb-[clamp(4rem,10vh,7rem)] pt-[clamp(7rem,16vh,11rem)]">
        {/* ---------- masthead ---------- */}
        <header className="grid items-end gap-[clamp(1.5rem,4vw,3rem)] border-b border-line pb-[clamp(2rem,6vh,4rem)] lg:grid-cols-[auto_1fr_auto]">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden border border-line">
            <Image
              src="/assets/images/profile.jpg"
              alt={`${profile.name} portrait`}
              fill
              sizes="96px"
              className="object-cover grayscale"
            />
          </div>

          <div>
            <div className="t-eyebrow mb-3">CURRICULUM VITAE — 2026</div>
            <h1 className="t-display-2">AAYUSH NEUPANE</h1>
            <p className="t-meta mt-3">{profile.roleLine}</p>
          </div>

          <div className="text-left lg:text-right">
            <div className="t-meta">{profile.location.toUpperCase()}</div>
            <div className="t-meta mt-1 !text-ivory-3">
              {profile.university.toUpperCase()}
            </div>
            <div className="t-meta mt-1 !text-ivory-3">{profile.years}</div>
            <a
              href={`mailto:${profile.socials.email}`}
              className="t-meta link-underline mt-3 inline-block hover:text-accent"
            >
              {profile.socials.email}
            </a>
          </div>
        </header>

        <div className="grid gap-x-[clamp(2rem,6vw,6rem)] lg:grid-cols-2">
          <div>
            <Section index="01" title="SUMMARY">
              <p className="t-body max-w-[58ch]">{profile.summary}</p>
            </Section>

            <Section index="02" title="EDUCATION">
              <div className="border-l border-line pl-5">
                <div className="t-display-3 !text-[clamp(1.1rem,2vw,1.5rem)]">
                  Kathmandu University
                </div>
                <div className="t-meta mt-1.5 !text-ivory-2">
                  B.E. COMPUTER ENGINEERING · GPA {profile.gpa}
                </div>
                <div className="t-meta !text-ivory-3">{profile.years}</div>
                <p className="mt-3 max-w-[54ch] text-[0.85rem] leading-relaxed text-ivory-2">
                  Coursework: Cryptography, Information Security, Computer Networks,
                  Operating Systems, Data Structures &amp; Algorithms, Discrete
                  Mathematics, Linear Algebra.
                </p>
              </div>
            </Section>

            <Section index="03" title="EXPERIENCE">
              <div className="space-y-7">
                {timeline
                  .filter((t) => t.kind === "internship" || t.kind === "education")
                  .map((entry) => (
                    <div key={entry.move} className="border-l border-line pl-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                        <span className="t-meta !text-accent">
                          MOVE {String(entry.move).padStart(2, "0")}
                        </span>
                        <span className="t-meta !text-ivory-3">{entry.date}</span>
                      </div>
                      <div className="t-display-3 mt-2 !text-[clamp(1.1rem,2vw,1.5rem)]">
                        {entry.title}
                      </div>
                      {entry.subtitle && (
                        <div className="t-meta mt-1.5 !text-ivory-2">
                          {entry.subtitle}
                        </div>
                      )}
                      <p className="mt-2.5 max-w-[56ch] text-[0.85rem] leading-relaxed text-ivory-2">
                        {entry.content}
                      </p>
                    </div>
                  ))}

                <div className="border-l border-line pl-5">
                  <div className="t-meta !text-ivory-3">
                    CERTIFICATION
                  </div>
                  <div className="t-display-3 mt-2 !text-[clamp(1.1rem,2vw,1.5rem)]">
                    Cybersecurity Internship Certificate
                  </div>
                  <div className="t-meta mt-1.5 !text-ivory-2">
                    NETWORK SECURITY & PENETRATION TESTING · PRODIGY INFOTECH
                  </div>
                </div>
              </div>
            </Section>

            <Section index="04" title="ACHIEVEMENTS">
              <ul className="space-y-4">
                {achievements.map((a) => (
                  <li
                    key={a.index}
                    className="flex items-baseline gap-5 border-b border-line pb-4 last:border-b-0"
                  >
                    <span className="font-mono text-[0.65rem] tracking-[0.2em] text-accent">
                      {a.index}
                    </span>
                    <span className="min-w-0">
                      <span className="t-display-3 !text-[clamp(1.05rem,1.8vw,1.35rem)]">
                        {a.value} — {a.label}
                      </span>
                      <span className="mt-1 block text-[0.82rem] leading-relaxed text-ivory-2">
                        {a.context}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div>
            <Section index="05" title="SELECTED PROJECTS">
              <ul className="space-y-6">
                {projects.map((p) => (
                  <li key={p.slug} className="border-l border-line pl-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                      <span className="t-display-3 !text-[clamp(1.05rem,1.9vw,1.4rem)]">
                        {p.name}
                      </span>
                      <span className="t-meta !text-ivory-3">{p.notation.toUpperCase()}</span>
                    </div>
                    <div className="t-meta mt-1.5 !text-ivory-2">{p.type}</div>
                    <p className="mt-2 max-w-[54ch] text-[0.85rem] leading-relaxed text-ivory-2">
                      {p.valueProp}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      {p.tech.map((t) => (
                        <span key={t} className="font-mono text-[0.62rem] tracking-[0.14em] text-ivory-3">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.links[0] && (
                      <a
                        href={p.links[0].href}
                        target={p.links[0].href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          p.links[0].href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="t-meta link-underline mt-2 inline-block hover:text-accent"
                      >
                        {p.links[0].label} ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Section>

            <Section index="06" title="SKILLS">
              <dl className="space-y-5">
                {Object.entries(skills).map(([group, list]) => (
                  <div key={group} className="border-l border-line pl-5">
                    <dt className="t-meta !text-accent">{group}</dt>
                    <dd className="mt-1.5 text-[0.85rem] leading-relaxed text-ivory-2">
                      {list}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section index="07" title="LANGUAGES">
              <div className="flex flex-wrap gap-3">
                {["English", "Nepali", "Hindi"].map((l) => (
                  <span
                    key={l}
                    className="border border-line px-4 py-2 font-mono text-[0.68rem] tracking-[0.16em] text-ivory-2"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </Section>

            <Section index="08" title="CONTACT">
              <ul className="space-y-2.5">
                {[
                  { label: profile.socials.email, href: `mailto:${profile.socials.email}` },
                  { label: profile.socials.phone, href: `tel:${profile.socials.phone.replace(/\s/g, "")}` },
                  { label: "GitHub — AAyush746", href: profile.socials.github },
                  { label: "LinkedIn — Aayush Neupane", href: profile.socials.linkedin },
                ].map((c) => (
                  <li key={c.href}>
                    <a
                      href={c.href}
                      {...(c.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="link-underline text-[0.95rem] text-ivory-2 transition-colors hover:text-accent"
                    >
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-line pt-[clamp(1.5rem,4vh,2.5rem)]">
          <span className="t-meta !text-ivory-3">
            END OF RECORD · {profile.footerNote}
          </span>
          <BoardButton label="RETURN TO THE BOARD" />
        </div>
      </article>
    </>
  );
}
