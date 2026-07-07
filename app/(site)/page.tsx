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
import { getTestimonials, getSiteContent, getBusinessUnits } from "@/lib/data";

// Admin edits call revalidatePath for instant updates; this is a backstop so
// changes made directly in Supabase appear within a minute.
export const revalidate = 60;

export default async function Home() {
  const [
    testimonials,
    businessUnits,
    hero,
    meaningfulLives,
    strategy,
    eos,
    coreValues,
    journey,
    greatPlace,
    careers,
    contact,
    company,
  ] = await Promise.all([
    getTestimonials(),
    getBusinessUnits(),
    getSiteContent("hero"),
    getSiteContent("meaningfulLives"),
    getSiteContent("strategy"),
    getSiteContent("eos"),
    getSiteContent("coreValues"),
    getSiteContent("journey"),
    getSiteContent("greatPlace"),
    getSiteContent("careers"),
    getSiteContent("contact"),
    getSiteContent("company"),
  ]);

  return (
    <>
      <ScrollDecor />
      <SectionNav />
      <Hero data={hero} />
      <BusinessUnits units={businessUnits} />
      <MeaningfulLives data={meaningfulLives} />
      <EOS data={eos} />
      <Strategy data={strategy} />
      <CoreValues items={coreValues} />
      <Journey data={journey} />
      <GreatPlace data={greatPlace} />
      <Testimonials items={testimonials} />
      <Careers data={careers} />
      <Contact data={contact} company={company} />
    </>
  );
}
