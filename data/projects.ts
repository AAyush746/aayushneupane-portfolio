export type ProjectVisual =
  | "packets"
  | "topology"
  | "phish"
  | "cipher"
  | "editorial";

export type Project = {
  slug: string;
  index: string;
  notation: string;
  opening: string;
  name: string;
  type: string;
  status?: string;
  tech: string[];
  valueProp: string;
  metric: { value: string; label: string };
  visual: ProjectVisual;
  links: { label: string; href: string }[];
  caseStudy: {
    problem: string;
    approach: string;
    architecture: string[];
    implementation: string[];
    results: string[];
    learned: string;
    stack: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "eigenguard",
    index: "01",
    notation: "e4",
    opening: "THE SICILIAN",
    name: "Eigenguard",
    type: "Hybrid Intrusion Detection System",
    tech: ["Python", "Scikit-learn", "CICIDS2017", "React", "SSH Honeypot"],
    valueProp:
      "Signature rules fused with machine learning, so known signatures and novel attacks get caught in the same pass.",
    metric: { value: "0.40", label: "leave-one-tool-out recall vs 0.999 random-split F1" },
    visual: "topology",
    links: [
      { label: "VIEW SOURCE", href: "https://github.com/AAyush746/Eigenguard" },
    ],
    caseStudy: {
      problem:
        "Signature-based detection stops what has already been seen. Anything novel walks past the rule set — and a random train/test split hides that fact behind an optimistic score.",
      approach:
        "Combine signature-based rules with scikit-learn anomaly detection, then evaluate honestly: leave-one-tool-out instead of a random split.",
      architecture: [
        "Traffic",
        "Feature extraction",
        "Signature detection + ML anomaly detection",
        "Alert",
        "React dashboard",
      ],
      implementation: [
        "Designed a hybrid IDS combining signature-based rules with machine-learning anomaly detection.",
        "Benchmarked classifiers on CICIDS2017 traffic, with an ML detection pipeline and a React dashboard.",
        "Added an SSH honeypot that captures attacker credentials alongside the detection pipeline.",
      ],
      results: [
        "Leave-one-tool-out recall of 0.40 against 0.999 F1 on a random split.",
        "The gap proved the model had learned path-probing, not injection payloads.",
      ],
      learned:
        "Evaluation design is half the security. The split you choose is part of the threat model.",
      stack: ["Python", "Scikit-learn", "CICIDS2017", "React", "Machine Learning"],
    },
  },
  {
    slug: "packet-analyzer",
    index: "02",
    notation: "Nf3",
    opening: "THE RUY LOPEZ",
    name: "Network Packet Analyzer",
    type: "Real-time Capture & Security Assessment Tool",
    tech: ["Python", "Scapy", "Tkinter", "Threading"],
    valueProp:
      "A multithreaded capture pipeline that stays responsive under load — 8,200 packets per second with live alert rules.",
    metric: { value: "8,200", label: "packets/second — 7.4× over the baseline" },
    visual: "packets",
    links: [
      { label: "VIEW SOURCE", href: "https://github.com/AAyush746/Network_packet_analyzer" },
    ],
    caseStudy: {
      problem:
        "A packet analyzer that freezes under peak load is worse than no analyzer: the GUI stops telling the truth exactly when traffic gets interesting.",
      approach:
        "Decouple the sniffer from the interface with a bounded queue, remove redundant serialization, and measure p99 latency instead of averages.",
      architecture: [
        "NIC capture (Scapy)",
        "Bounded queue",
        "Worker threads",
        "Alert rules",
        "Tkinter GUI + session export",
      ],
      implementation: [
        "Built a multithreaded capture pipeline that decouples the Scapy sniffer from the Tkinter GUI through a bounded queue.",
        "Engineered four real-time alert rules — SYN flood, port scan, credential leak, oversized flow.",
        "Added session export to PCAP, CSV and JSON with a lightweight memory footprint.",
      ],
      results: [
        "Throughput lifted 7.4× — 1,107 → 8,200 PPS.",
        "p99 latency cut to 442 μs; a 0.500 precision regression on the alert rules was found and fixed.",
      ],
      learned: "Sometimes the fastest code is the code you delete — remove the serialization, keep the truth.",
      stack: ["Python", "Scapy", "Tkinter", "Threading", "Networking"],
    },
  },
  {
    slug: "phishing-portal",
    index: "03",
    notation: "O-O",
    opening: "THE ITALIAN GAME",
    name: "Phishing Awareness Portal",
    type: "Security Awareness Platform",
    status: "ONGOING",
    tech: ["PostgreSQL", "React", "REST APIs"],
    valueProp:
      "Simulated phishing campaigns that measure what employees actually click — and what they report.",
    metric: { value: "ONGOING", label: "campaign engine in active development" },
    visual: "phish",
    links: [{ label: "VIEW SOURCE", href: "https://github.com/AAyush746/PL" }],
    caseStudy: {
      problem:
        "Phishing defence is a human problem measured with technical instruments — you cannot improve awareness you never measured.",
      approach:
        "Run controlled simulated campaigns, record click and report behaviour, and turn the data into training workflows.",
      architecture: [
        "Campaign builder",
        "Delivery + landing pages",
        "Click / report telemetry",
        "PostgreSQL",
        "React dashboard",
      ],
      implementation: [
        "Implemented campaign management, user tracking and training workflows.",
        "Built a React dashboard over a PostgreSQL database with REST APIs.",
      ],
      results: ["[CONTENT NEEDED] — measured click/report rates publish once the first campaign runs."],
      learned: "[CONTENT NEEDED]",
      stack: ["PostgreSQL", "React", "REST APIs", "Security Awareness"],
    },
  },
  {
    slug: "image-encryption",
    index: "04",
    notation: "Bc4",
    opening: "THE FRENCH DEFENCE",
    name: "Image Encryption",
    type: "Hybrid Cryptography CLI",
    tech: ["AES", "RSA", "Python"],
    valueProp:
      "AES for the bytes, RSA for the key — one-command confidentiality for images and media.",
    metric: { value: "1", label: "command to encrypt or decrypt" },
    visual: "cipher",
    links: [
      {
        label: "VIEW SOURCE",
        href: "https://github.com/AAyush746/Image_encryption-decryption",
      },
    ],
    caseStudy: {
      problem:
        "Bulk encryption needs speed, key exchange needs safety — picking one primitive means compromising the other.",
      approach:
        "Hybrid encryption: fast AES for the file, RSA for the key exchange, with generated key pairs and a single command for each operation.",
      architecture: ["Plain image", "AES key", "RSA-encrypted key", "Cipher file", "CLI decrypt"],
      implementation: [
        "Automated key pair generation.",
        "Encrypt/decrypt as a single command, keeping key handling simple.",
      ],
      results: ["Real confidentiality protection without the key-handling headaches."],
      learned: "Cryptography is a workflow problem as much as a mathematical one.",
      stack: ["AES", "RSA", "Hybrid Encryption", "Python", "CLI"],
    },
  },
  {
    slug: "mamas-cafe",
    index: "05",
    notation: "Qd7",
    opening: "THE LONDON SYSTEM",
    name: "Mama's Cafe",
    type: "Production Restaurant Website",
    tech: ["Responsive Frontend", "Deployment"],
    valueProp:
      "A live site for a real restaurant — from first sketch to production traffic, designed and maintained end-to-end.",
    metric: { value: "LIVE", label: "mamascafe.cafe — real users, real orders" },
    visual: "editorial",
    links: [{ label: "VISIT SITE", href: "https://mamascafe.cafe" }],
    caseStudy: {
      problem:
        "A real client needs a site that loads fast on any phone, reads clearly, and can be maintained after launch.",
      approach:
        "Responsive front-end, deployed and owned end-to-end.",
      architecture: ["Design", "Responsive build", "Deployment", "Production traffic"],
      implementation: [
        "Designed, deployed and maintains a responsive website for a real restaurant.",
        "Owned delivery from first sketch to production.",
      ],
      results: ["A live, production website serving real customers."],
      learned: "Shipping for a real client turns every theoretical best practice into a practical one.",
      stack: ["Responsive Frontend", "Deployment", "Production"],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
