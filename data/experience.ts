export type TimelineEntry = {
  move: number;
  title: string;
  subtitle?: string;
  date: string;
  content: string;
  kind: "education" | "competition" | "internship" | "project";
};

export const timeline: TimelineEntry[] = [
  {
    move: 1,
    title: "Kathmandu University",
    subtitle: "B.E. Computer Engineering, GPA 3.8",
    date: "2022 — 2027 (expected)",
    kind: "education",
    content:
      "Started my Computer Engineering degree in Dhulikhel, Nepal. Coursework that shaped everything since: Cryptography, Information Security, Computer Networks, Operating Systems and Data Structures & Algorithms.",
  },
  {
    move: 2,
    title: "1st Place — Capture The Flag",
    subtitle: "First place, CTF competition",
    date: "2023",
    kind: "competition",
    content:
      "Took first place in a Capture The Flag competition — enumeration, exploitation and a flag recovered before the clock did. It was the moment \"I read the docs\" turned into \"I read the traffic\".",
  },
  {
    move: 3,
    title: "Cybersecurity Intern — Prodigy InfoTech",
    subtitle: "Network defense & penetration testing",
    date: "June 2024 — July 2024",
    kind: "internship",
    content:
      "Remote internship working on network defense and penetration testing. Analysed TCP, UDP, HTTP and DNS traffic with Wireshark and custom scripts, practised reconnaissance and vulnerability assessment, and applied symmetric and asymmetric cryptography on real lab targets.",
  },
  {
    move: 4,
    title: "Network Packet Analyzer",
    subtitle: "8,200 PPS, p99 442 μs",
    date: "2024",
    kind: "project",
    content:
      "Built a multithreaded capture pipeline that keeps a GUI honest under load. Removing redundant serialization bought a 7.4× throughput jump and fixed a 0.500 precision regression on the alert rules.",
  },
  {
    move: 5,
    title: "Eigenguard — Hybrid IDS",
    subtitle: "Signature rules + machine learning",
    date: "2025",
    kind: "project",
    content:
      "Designed a hybrid IDS for CICIDS2017 traffic, benchmarked classifiers, and added an SSH honeypot that captures attacker credentials alongside a React dashboard. The leave-one-tool-out result (0.40 recall vs 0.999 random-split F1) was the most useful number I learned all year.",
  },
  {
    move: 6,
    title: "Image Encryption System",
    subtitle: "AES for data, RSA for keys",
    date: "2025",
    kind: "project",
    content: "A hybrid encryption CLI: AES protects the bytes, RSA protects the key. Automatic key pair generation and one-command workflows.",
  },
  {
    move: 7,
    title: "Mama's Cafe goes live",
    subtitle: "Real client, real traffic",
    date: "2025",
    kind: "project",
    content:
      "Designed, deployed and maintain a responsive website for a real restaurant — owning it from sketch to production.",
  },
  {
    move: 8,
    title: "3rd Place — Chess Championship",
    subtitle: "Inter-department, Kathmandu University",
    date: "2025",
    kind: "competition",
    content:
      "Third place in the inter-department chess championship. Position evaluation, candidate moves, calculation — the same disciplined loop I bring to threat modelling.",
  },
];
