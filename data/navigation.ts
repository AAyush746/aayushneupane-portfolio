export type NavItem = {
  id: string;
  index: string;
  label: string;
  square: string;
  move: string;
};

// id = DOM anchor on the home experience, square = the board coordinate that
// represents it, move = the notation used by the hero's signature transition.
export const navigation: NavItem[] = [
  { id: "opening", index: "01", label: "OPENING", square: "A1", move: "a3" },
  { id: "position", index: "02", label: "POSITION", square: "E4", move: "e4" },
  { id: "player", index: "03", label: "PLAYER", square: "B2", move: "Nf3" },
  { id: "work", index: "04", label: "WORK", square: "C3", move: "Bc4" },
  { id: "experience", index: "05", label: "EXPERIENCE", square: "D5", move: "O-O" },
  { id: "chess", index: "06", label: "CHESS", square: "G7", move: "Qh7" },
  { id: "contact", index: "07", label: "CONTACT", square: "G2", move: "Qh7#" },
];

// Squares that behave like navigation on the interactive board (§9).
export const squareRoutes: Record<string, { label: string; href: string }> = {
  E4: { label: "OPENING", href: "#position" },
  C3: { label: "PROJECTS", href: "#work" },
  F7: { label: "SECURITY", href: "#mindset" },
  D5: { label: "EXPERIENCE", href: "#experience" },
  G2: { label: "CONTACT", href: "#contact" },
};
