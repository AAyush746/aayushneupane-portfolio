import { Hero } from "@/components/sections/Hero";
import { Position } from "@/components/sections/Position";
import { Player } from "@/components/sections/Player";
import { Battles } from "@/components/sections/Battles";
import { Openings } from "@/components/sections/Openings";
import { Mindset } from "@/components/sections/Mindset";
import { History } from "@/components/sections/History";
import { Chess } from "@/components/sections/Chess";
import { Philosophy } from "@/components/sections/Philosophy";
import { Journal } from "@/components/sections/Journal";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Position />
      <Player />
      <Battles />
      <Openings />
      <Mindset />
      <History />
      <Chess />
      <Philosophy />
      <Journal />
      <Contact />
      <Footer />
    </>
  );
}
