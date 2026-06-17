import HomeHero from "@/components/home/HomeHero";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import Workflow from "@/components/home/Workflow";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhoWeWorkWith />
      <WhatWeOffer />
      <Workflow />
    </>
  );
}
