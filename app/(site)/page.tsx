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
import { getTestimonials, getSiteContent } from "@/lib/data";

// Admin edits call revalidatePath for instant updates; this is a backstop so
// changes made directly in Supabase appear within a minute.
export const revalidate = 60;

export default async function Home() {
  const [testimonials, hero, meaningfulLives, strategy, contact, company] =
    await Promise.all([
      getTestimonials(),
      getSiteContent("hero"),
      getSiteContent("meaningfulLives"),
      getSiteContent("strategy"),
      getSiteContent("contact"),
      getSiteContent("company"),
    ]);

  return (
    <>
      <ScrollDecor />
      <SectionNav />
      <Hero data={hero} />
      <BusinessUnits />
      <MeaningfulLives data={meaningfulLives} />
      <EOS />
      <Strategy data={strategy} />
      <CoreValues />
      <Journey />
      <GreatPlace />
      <Testimonials items={testimonials} />
      <Careers />
      <Contact data={contact} company={company} />
    </>
  );
}
