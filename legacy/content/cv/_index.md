+++
title = "CV"
template = "cv.html"
description = "Résumé of Aayush Neupane — cybersecurity engineering student, intrusion detection and applied cryptography, CTF and chess competitor."

[extra]
name = "Aayush Neupane"
role = "Computer Engineering Student · Cybersecurity"
profile_picture = "/assets/images/profile.jpg"
+++

## Professional Summary

Final-year Computer Engineering student focused on **cybersecurity**. Built a hybrid
**intrusion detection system** and a multithreaded **packet analyzer** reaching
**8,200 packets per second**; **1st place** in a Capture The Flag competition.
Targeting SOC Analyst, Penetration Testing and security-focused SWE roles.

## Education

### Kathmandu University — Dhulikhel, Nepal

**Bachelor of Engineering (B.E.), Computer Engineering** · 2022 — 2027 (expected) · GPA: 3.8

Relevant coursework: Cryptography, Information Security, Computer Networks,
Operating Systems, Data Structures & Algorithms, Discrete Mathematics, Linear Algebra.

## Experience

### Cybersecurity Intern · Prodigy InfoTech (Remote)

*Network Defense & Penetration Testing · June 2024 — July 2024*

- Analysed **TCP, UDP, HTTP and DNS** traffic with **Wireshark** and custom scripts to
  flag anomalies in hands-on lab exercises.
- Practised **reconnaissance** and **vulnerability assessment** for **penetration
  testing**, and applied symmetric and asymmetric cryptography on practical targets.

## Projects

### Eigenguard — Hybrid Intrusion Detection System

*Python, Scikit-learn, CICIDS2017 · [GitHub](https://github.com/AAyush746/Eigenguard)*

- Designed a **hybrid IDS** combining **signature-based rules** with **machine learning
  anomaly detection** so both known signatures and novel attacks are caught.
- Benchmarked classifiers on **CICIDS2017** traffic, with a React dashboard, an ML
  detection pipeline and an **SSH honeypot** that captures attacker credentials.
- Key finding: leave-one-tool-out recall of **0.40** against **0.999** random-split F1,
  showing the model had learned path-probing rather than injection payloads.

### Network Packet Analyzer & Security Assessment Tool

*Python, Scapy, Tkinter, Threading · [GitHub](https://github.com/AAyush746/Network_packet_analyzer)*

- Built a **multithreaded capture pipeline** that decouples the Scapy sniffer from the
  Tkinter GUI through a bounded queue, removing peak-load freezes.
- Boosted throughput **7.4×** (**1,107 → 8,200 PPS**) by removing redundant
  serialization, cutting p99 latency to **442 μs**.
- Engineered **4 real-time alert rules** — SYN flood, port scan, credential leak and
  oversized flows — and fixed a **0.500 precision** regression.
- Added session export to **PCAP, CSV and JSON** with a lightweight memory footprint.

### Phishing Simulation & Awareness Portal

*PostgreSQL, React, REST APIs · Ongoing · [GitHub](https://github.com/AAyush746/PL)*

- Building a **full-stack** application that launches simulated **phishing campaigns**
  and measures employee click and report behaviour.
- Implemented campaign management, user tracking and training workflows with a **React**
  dashboard, **PostgreSQL** database and REST APIs.

### Image Encryption System

*Hybrid Encryption, CLI · [GitHub](https://github.com/AAyush746/Image_encryption-decryption)*

- Developed a CLI tool using **hybrid encryption**: fast **AES** for image and media
  files, **RSA** for secure key exchange.
- Automated **key pair generation** and one-command encrypt/decrypt workflows, keeping
  confidentiality strong and key handling simple.

### Mama's Cafe — Production Restaurant Website

*Responsive Frontend, Deployment · [mamascafe.cafe](https://mamascafe.cafe)*

- Designed, **deployed** and maintain a **responsive** website for a real restaurant,
  owning delivery from first sketch to production.

## Skills

**Cybersecurity** — Network Security, Vulnerability Assessment, Penetration Testing,
Traffic Analysis, Threat Detection, Intrusion Detection (IDS), Reconnaissance,
Phishing Simulation

**Security Tools** — Wireshark, Nmap, Scapy, Metasploit, Linux/Unix, Git

**Cryptography** — AES, RSA, Digital Signatures, Secure Key Management

**Networking** — TCP/IP, DNS, HTTP/HTTPS, UDP

**Programming & Data** — Python, SQL, PostgreSQL, JavaScript, HTML/CSS,
Scikit-learn (Anomaly Detection, Classification)

**Web & Backend** — React, REST APIs, Responsive Web Development, Deployment

## Certifications

Cybersecurity Internship Certificate — Network Security & Penetration Testing,
Prodigy InfoTech

## Achievements

- **1st Place** — Capture The Flag (CTF) competition
- **3rd Place** — Inter-department Chess Championship, Kathmandu University

## Languages

English, Nepali, Hindi