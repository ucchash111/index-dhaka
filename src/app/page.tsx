export const dynamic = "force-dynamic";

import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Idea from "@/components/landing/Idea";
import WhoBelongs from "@/components/landing/WhoBelongs";
import HowItWorks from "@/components/landing/HowItWorks";
import Members from "@/components/landing/Members";
import Apply from "@/components/landing/Apply";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Idea />
        <WhoBelongs />
        <HowItWorks />
        <Members />
        <Apply />
      </main>
      <Footer />
    </>
  );
}
