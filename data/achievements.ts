export type Achievement = {
  move: string;
  index: string;
  value: string;
  suffix?: string;
  label: string;
  context: string;
};

export const achievements: Achievement[] = [
  {
    move: "MOVE 01",
    index: "01",
    value: "1ST",
    label: "PLACE — CAPTURE THE FLAG",
    context: "Enumeration, exploitation, and a flag recovered before the clock did.",
  },
  {
    move: "MOVE 02",
    index: "02",
    value: "3RD",
    label: "PLACE — INTER-DEPARTMENT CHESS",
    context: "Kathmandu University championship. Position, candidates, calculation.",
  },
  {
    move: "MOVE 03",
    index: "03",
    value: "3.8",
    label: "GPA — KATHMANDU UNIVERSITY",
    context: "B.E. Computer Engineering, 2022 — 2027 (expected).",
  },
  {
    move: "MOVE 04",
    index: "04",
    value: "8,200",
    label: "PACKETS / SECOND",
    context: "Packet analyzer throughput, 7.4× over the baseline. p99 442 μs.",
  },
  {
    move: "MOVE 05",
    index: "05",
    value: "0.40",
    label: "LEAVE-ONE-TOOL-OUT RECALL",
    context: "Eigenguard — against 0.999 on a random split. Evaluation design matters.",
  },
];
