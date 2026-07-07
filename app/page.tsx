import Hero from "@/components/sections/Hero";
import BusinessUnits from "@/components/sections/BusinessUnits";
import MeaningfulLives from "@/components/sections/MeaningfulLives";
import EOS from "@/components/sections/EOS";
import Strategy from "@/components/sections/Strategy";
import CoreValues from "@/components/sections/CoreValues";
import Journey from "@/components/sections/Journey";
import GreatPlace from "@/components/sections/GreatPlace";
import Testimonials from "@/components/sections/Testimonials";
import Careers from "@/components/sections/Careers";
import Contact from "@/components/sections/Contact";
import ScrollDecor from "@/components/ScrollDecor";
import SectionNav from "@/components/SectionNav";
import { getTestimonials } from "@/lib/data";

export default async function Home() {
  const testimonials = await getTestimonials();

  return (
    <>
      <ScrollDecor />
      <SectionNav />
      <Hero />
      <BusinessUnits />
      <MeaningfulLives />
      <EOS />
      <Strategy />
      <CoreValues />
      <Journey />
      <GreatPlace />
      <Testimonials items={testimonials} />
      <Careers />
      <Contact />
    </>
  );
}
