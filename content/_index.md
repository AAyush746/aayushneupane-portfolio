+++
[extra]
profile_picture = "/assets/images/profile.jpg"
name = "Aayush Neupane"
subtitle = "Computer Science Engineering Student & Chess Player"
badges = [
  "1st Place · CTF",
  "3rd Place · Inter-department Chess",
  "GPA 3.8 · Kathmandu University",
]
about_me = """
**Hey!**

I'm Aayush Neupane, a final-year Computer Engineering student at
[Kathmandu University](https://ku.edu.np/), Nepal, focused on **cybersecurity**.  
I build tools that watch the wire: a hybrid intrusion detection system that mixes
signature rules with machine learning, and a multithreaded packet analyzer that
pushes 8,200 packets per second.

When I'm not reading packets, I'm reading positions — **1st place in a Capture The Flag**,
**3rd in my department's chess championship**. Same instinct either way: find the weak square,
exploit it, and never stop calculating.

Open to SOC Analyst, Penetration Testing and security-focused SWE roles.
Get in touch, or take a look at my work below.
"""
###########
# SOCIALS #
###########

[[extra.socials]]
name = "github"
icon = "/assets/icons/github.svg"
label = "AAyush746"
link = "https://github.com/AAyush746"
[[extra.socials]]
name = "linkedin"
icon = "/assets/icons/linkedin.svg"
label = "in/aayush-neupane"
link = "https://www.linkedin.com/in/aayush-neupane-1a9883290/"
[[extra.socials]]
name = "mail"
icon = "/assets/icons/mail.svg"
label = "neupaneaayush296@gmail.com"
link = "mailto:neupaneaayush296@gmail.com"
[[extra.socials]]
name = "phone"
icon = "/assets/icons/phone.svg"
label = "+977 981 223 1184"
link = "tel:+9779812231184"

################
# TOP PROJECTS #
################

[[extra.top_projects]]
name = "Eigenguard"
icon = "/assets/icons/chess/chess-knight.svg"
link = "https://github.com/AAyush746/Eigenguard"
calltoaction = "View on GitHub"
background = "#151515"
color = "#f2f2f2"
description = """
A **hybrid intrusion detection system**: signature-based rules fused with
scikit-learn anomaly detection, so known signatures *and* novel attacks get caught.  
Trained on **CICIDS2017** with a React dashboard and an ML detection pipeline. The
interesting finding: leave-one-tool-out recall of **0.40** versus **0.999** F1 on a
random split — proof the model had learned path-probing, not injection payloads.
"""

[[extra.top_projects]]
name = "Packet Analyzer"
icon = "/assets/icons/chess/chess-rook.svg"
link = "https://github.com/AAyush746/Network_packet_analyzer"
calltoaction = "View on GitHub"
background = "#f2f2f2"
color = "#111111"
description = """
A real-time capture and assessment tool in **Python, Scapy and Tkinter**.  
A bounded queue decouples the sniffer from the GUI, which lifted throughput
**7.4×** (1,107 → **8,200 PPS**) and cut p99 latency to **442 μs**.  
Four live alert rules — SYN flood, port scan, credential leak, oversized flow — and
session export to **PCAP, CSV and JSON**.
"""

[[extra.top_projects]]
name = "Phishing Portal"
icon = "/assets/icons/chess/chess-queen.svg"
link = "https://github.com/AAyush746/PL"
calltoaction = "View on GitHub"
background = "#151515"
color = "#f2f2f2"
description = """
An **ongoing** full-stack awareness platform that runs simulated phishing campaigns
and measures real employee click and report behaviour.  
**React** dashboard, **PostgreSQL** database and REST APIs, with campaign
management, user tracking and training workflows.
"""

[[extra.top_projects]]
name = "Image Encryption"
icon = "/assets/icons/chess/chess-bishop.svg"
link = "https://github.com/AAyush746/Image_encryption-decryption"
calltoaction = "View on GitHub"
background = "#f2f2f2"
color = "#111111"
description = """
A CLI tool built on **hybrid encryption**: **AES** for fast bulk image and media
encryption, **RSA** for safe key exchange.  
Key pair generation is automated and encrypt/decrypt is a single command — real
confidentiality protection without the key-handling headaches.
"""

[[extra.top_projects]]
name = "Mama's Cafe"
icon = "/assets/icons/chess/chess-pawn.svg"
link = "https://mamascafe.cafe"
calltoaction = "Visit Website"
background = "#151515"
color = "#f2f2f2"
description = """
A **live, production** website for a real restaurant.  
Responsive front-end, deployed and maintained end-to-end — from first sketch to
production traffic.
"""

############
# TIMELINE #
############

[[extra.timeline]]
title = "Kathmandu University"
subtitle = "B.E. Computer Engineering, GPA 3.8"
date = "2022 — 2027 (expected)"
icon = "/assets/icons/chess/chess-pawn.svg"
background = "#f2f2f2"
foreground = "#111111"
content = """
Started my Computer Engineering degree in **Dhulikhel, Nepal**.  
Coursework that shaped everything since: Cryptography, Information Security,
Computer Networks, Operating Systems and Data Structures & Algorithms.
"""

[[extra.timeline]]
title = "1st Place — Capture The Flag"
subtitle = "First place, CTF competition"
date = "2023"
icon = "/assets/icons/flag.svg"
background = "#151515"
foreground = "#f2f2f2"
content = """
Took **first place** in a Capture The Flag competition — enumeration, exploitation
and a flag recovered before the clock did.  
It was the moment "I read the docs" turned into "I read the traffic".
"""

[[extra.timeline]]
title = "Cybersecurity Intern — Prodigy InfoTech"
subtitle = "Network defense & penetration testing"
date = "June 2024 — July 2024"
icon = "/assets/icons/shield-lock.svg"
background = "#f2f2f2"
foreground = "#111111"
content = """
Remote internship working on **network defense and penetration testing**.  
Analysed **TCP, UDP, HTTP and DNS** traffic with **Wireshark** and custom scripts to
flag anomalies, practised reconnaissance and vulnerability assessment, and applied
symmetric and asymmetric cryptography on real lab targets.
"""

[[extra.timeline]]
title = "Network Packet Analyzer"
subtitle = "8,200 PPS, p99 442 μs"
date = "2024"
icon = "/assets/icons/chess/chess-rook.svg"
background = "#151515"
foreground = "#f2f2f2"
content = """
Built a multithreaded capture pipeline that keeps a GUI honest under load.  
Removing redundant serialization bought a **7.4× throughput jump** and a fixed
**0.500 precision** regression on the alert rules. Sometimes the fastest code is the
code you delete.
"""

[[extra.timeline]]
title = "Eigenguard — Hybrid IDS"
subtitle = "Signature rules + machine learning"
date = "2025"
icon = "/assets/icons/chess/chess-knight.svg"
background = "#f2f2f2"
foreground = "#111111"
content = """
Designed a hybrid IDS for **CICIDS2017** traffic, benchmarked classifiers, and added an
**SSH honeypot** that captures attacker credentials alongside a React dashboard.  
The leave-one-tool-out result (0.40 recall vs 0.999 random-split F1) was the most
useful number I learned all year — evaluation design is half the security.
"""

[[extra.timeline]]
title = "Image Encryption System"
subtitle = "AES for data, RSA for keys"
date = "2025"
icon = "/assets/icons/chess/chess-bishop.svg"
background = "#151515"
foreground = "#f2f2f2"
content = """
A hybrid encryption CLI: **AES** protects the bytes, **RSA** protects the key.  
Automatic key pair generation and one-command workflows.
"""

[[extra.timeline]]
title = "Mama's Cafe goes live"
subtitle = "Real client, real traffic"
date = "2025"
icon = "/assets/icons/chess/chess-queen.svg"
background = "#f2f2f2"
foreground = "#111111"
content = """
Designed, deployed and maintain a responsive website for a real restaurant —
owning it from sketch to production.
"""

[[extra.timeline]]
title = "3rd Place — Chess Championship"
subtitle = "Inter-department, Kathmandu University"
date = "2025"
icon = "/assets/icons/chess/chess-king.svg"
background = "#151515"
foreground = "#f2f2f2"
content = """
**Third place** in the inter-department chess championship.  
Position evaluation, candidate moves, calculation — the same disciplined loop I bring
to threat modelling.
"""

+++