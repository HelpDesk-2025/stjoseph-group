import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteContent, getBusinessUnits } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nav, company, businessUnits, ui] = await Promise.all([
    getSiteContent("nav"),
    getSiteContent("company"),
    getBusinessUnits(),
    getSiteContent("ui"),
  ]);

  return (
    <SmoothScroll>
      <Navbar
        nav={nav}
        company={company}
        navCta={ui.navCta}
        businessUnits={businessUnits}
      />
      <main>{children}</main>
      <Footer
        company={company}
        businessUnits={businessUnits}
        newsletter={ui.newsletter}
      />
    </SmoothScroll>
  );
}
