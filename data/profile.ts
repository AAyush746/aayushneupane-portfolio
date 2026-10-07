export const profile = {
  name: "Aayush Neupane",
  firstName: "AAYUSH",
  lastName: "NEUPANE",
  roles: ["Computer Engineering Student", "Cybersecurity Engineer", "Chess Player"],
  roleLine: "Computer Engineering Student • Cybersecurity Engineer • Chess Player",
  location: "Kathmandu, Nepal",
  university: "Kathmandu University",
  field: "Computer Engineering",
  focus: "Cybersecurity",
  years: "2022 — 2027 (expected)",
  gpa: "3.8",

  // The spine of the whole experience.
  tagline: ["CALCULATE.", "ADAPT.", "DEFEND."],
  subTagline: "THINK LIKE A CHESS PLAYER. DEFEND LIKE A SECURITY ENGINEER.",

  heroSupport:
    "Computer Engineering student building systems, exploring security, and thinking several moves ahead.",

  metaTitle: "Aayush Neupane — Cybersecurity × Engineering × Chess",
  metaDescription:
    "Aayush Neupane is a Computer Engineering student and cybersecurity enthusiast from Nepal building secure systems, exploring offensive and defensive security, and thinking several moves ahead.",

  socials: {
    email: "neupaneaayush296@gmail.com",
    phone: "+977 981 223 1184",
    github: "https://github.com/AAyush746",
    linkedin: "https://www.linkedin.com/in/aayush-neupane-1a9883290/",
    cv: "/cv",
  },

  summary:
    "Final-year Computer Engineering student focused on cybersecurity. Built a hybrid intrusion detection system and a multithreaded packet analyzer reaching 8,200 packets per second; 1st place in a Capture The Flag competition. Targeting SOC Analyst, Penetration Testing and security-focused SWE roles.",

  statement: {
    lead: "EVERY MOVE STARTS WITH A POSITION.",
    body: "I approach cybersecurity the same way I approach chess:",
    steps: ["Observe.", "Analyze.", "Calculate.", "Act.", "Adapt."],
  },

  player: {
    lines: ["Computer Engineering", "Cybersecurity", "Chess"],
    body: "I am a Computer Engineering student at Kathmandu University focused on cybersecurity, systems, and secure software.\n\nOutside the terminal, I play chess. The two disciplines have more in common than they seem.",
  },

  philosophy: {
    quote: ["I DON'T TRY TO FIND", "THE FASTEST MOVE.", "I TRY TO FIND", "THE RIGHT ONE."],
    values: [
      { index: "01", name: "Curiosity", note: "Read the docs. Then read the traffic." },
      { index: "02", name: "Precision", note: "Every number earns its place." },
      { index: "03", name: "Experimentation", note: "Hypothesis, benchmark, result." },
      { index: "04", name: "Security", note: "Assume the opponent is already moving." },
      { index: "05", name: "Continuous learning", note: "The position never stops changing." },
    ],
  },

  mindset: {
    headline: "THE SAME MINDSET.",
    left: {
      title: "CHESS",
      rows: [
        "Read the position",
        "Find weaknesses",
        "Calculate variations",
        "Anticipate the opponent",
        "Control space",
        "Make the best move",
      ],
    },
    right: {
      title: "SECURITY",
      rows: [
        "Read the network",
        "Find vulnerabilities",
        "Model attack paths",
        "Anticipate threats",
        "Control exposure",
        "Defend the system",
      ],
    },
  },

  chess: {
    headline: "BEFORE THE TERMINAL, THERE WAS THE BOARD.",
    achievement: "3rd Place — Inter-department Chess Championship, Kathmandu University",
    body: "Position evaluation, candidate moves, calculation — the same disciplined loop I bring to threat modelling.",
  },

  footerNote: "GAME OVER / NEW GAME",
} as const;

export const skills = {
  Cybersecurity:
    "Network Security, Vulnerability Assessment, Penetration Testing, Traffic Analysis, Threat Detection, Intrusion Detection (IDS), Reconnaissance, Phishing Simulation",
  "Security Tools": "Wireshark, Nmap, Scapy, Metasploit, Linux/Unix, Git",
  Cryptography: "AES, RSA, Digital Signatures, Secure Key Management",
  Networking: "TCP/IP, DNS, HTTP/HTTPS, UDP",
  "Programming & Data":
    "Python, SQL, PostgreSQL, JavaScript, HTML/CSS, Scikit-learn (Anomaly Detection, Classification)",
  "Web & Backend": "React, REST APIs, Responsive Web Development, Deployment",
  Languages: "English, Nepali, Hindi",
} as const;
