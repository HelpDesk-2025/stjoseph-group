import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { businessUnits } from "@/lib/content";
import UnitHero from "@/components/UnitHero";
import UnitBody from "@/components/UnitBody";

export function generateStaticParams() {
  return businessUnits.map((u) => ({ slug: u.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const unit = businessUnits.find((u) => u.slug === params.slug);
  if (!unit) return { title: "Business Unit" };
  return {
    title: unit.name,
    description: unit.summary,
  };
}

export default function BusinessUnitPage({
  params,
}: {
  params: { slug: string };
}) {
  const unit = businessUnits.find((u) => u.slug === params.slug);
  if (!unit) notFound();

  const index = businessUnits.findIndex((u) => u.slug === unit.slug);
  const related = businessUnits.filter((u) => u.slug !== unit.slug).slice(0, 3);

  return (
    <>
      <UnitHero unit={unit} index={index} />
      <UnitBody unit={unit} related={related} />
    </>
  );
}
