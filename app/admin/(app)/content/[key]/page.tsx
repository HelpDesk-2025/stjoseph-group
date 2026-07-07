import Link from "next/link";
import { notFound } from "next/navigation";
import { sectionSchemas } from "@/app/admin/_lib/schemas";
import { getSiteContent, type SiteContentKey } from "@/lib/data";
import ContentEditor from "@/app/admin/_components/ContentEditor";

export const dynamic = "force-dynamic";

export default async function ContentEditorPage({
  params,
}: {
  params: { key: string };
}) {
  const schema = sectionSchemas[params.key];
  if (!schema) notFound();

  const initial = await getSiteContent(params.key as SiteContentKey);

  return (
    <div>
      <Link href="/admin" className="font-mono text-[12px] text-ink-300 hover:text-white">
        ← Back
      </Link>
      <h1 className="mt-3 font-sans text-2xl font-semibold text-white">{schema.title}</h1>
      {schema.description && (
        <p className="mt-2 max-w-xl font-mono text-[13px] text-ink-300">
          {schema.description}
        </p>
      )}

      <div className="mt-8">
        <ContentEditor schema={schema} initial={initial} />
      </div>
    </div>
  );
}
