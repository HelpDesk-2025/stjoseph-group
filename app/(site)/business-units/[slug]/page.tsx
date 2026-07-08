import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getBusinessUnit,
  getBusinessUnits,
  getAllBusinessUnitSlugs,
  getSiteContent,
} from "@/lib/data";
import UnitHero from "@/components/UnitHero";
import UnitBody from "@/components/UnitBody";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllBusinessUnitSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const unit = await getBusinessUnit(params.slug);
  if (!unit) return { title: "Business Unit" };
  return {
    title: unit.name,
    description: unit.summary,
  };
}

export default async function BusinessUnitPage({
  params,
}: {
  params: { slug: string };
}) {
  const unit = await getBusinessUnit(params.slug);
  if (!unit) notFound();

  const [all, ui, company] = await Promise.all([
    getBusinessUnits(),
    getSiteContent("ui"),
    getSiteContent("company"),
  ]);
  const index = Math.max(
    0,
    all.findIndex((u) => u.slug === unit.slug)
  );
  const related = all.filter((u) => u.slug !== unit.slug).slice(0, 3);

  return (
    <>
      <UnitHero unit={unit} index={index} labels={ui.unit} />
      <UnitBody
        unit={unit}
        related={related}
        labels={ui.unit}
        groupName={company.name}
      />
    </>
  );
}
