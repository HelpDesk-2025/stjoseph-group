import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessUnitAdmin } from "@/app/admin/_lib/data";
import { businessUnitSchema } from "@/app/admin/_lib/schemas";
import { saveBusinessUnit } from "@/app/actions/admin/business-units";
import ContentEditor from "@/app/admin/_components/ContentEditor";

export const dynamic = "force-dynamic";

export default async function EditBusinessUnitPage({
  params,
}: {
  params: { slug: string };
}) {
  const unit = await getBusinessUnitAdmin(params.slug);
  if (!unit) notFound();

  return (
    <div>
      <Link
        href="/admin/business-units"
        className="font-mono text-[12px] text-ink-300 hover:text-white"
      >
        ← Business units
      </Link>
      <h1 className="mt-3 font-sans text-2xl font-semibold text-white">{unit.name}</h1>
      <p className="mt-2 font-mono text-[13px] text-ink-300">/{unit.slug}</p>

      <div className="mt-8">
        <ContentEditor
          schema={businessUnitSchema}
          initial={unit}
          onSave={saveBusinessUnit.bind(null, params.slug)}
        />
      </div>
    </div>
  );
}
