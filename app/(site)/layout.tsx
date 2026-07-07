import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteContent, getBusinessUnits } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nav, company, businessUnits] = await Promise.all([
    getSiteContent("nav"),
    getSiteContent("company"),
    getBusinessUnits(),
  ]);

  return (
    <SmoothScroll>
      <Navbar nav={nav} company={company} />
      <main>{children}</main>
      <Footer company={company} businessUnits={businessUnits} />
    </SmoothScroll>
  );
}
