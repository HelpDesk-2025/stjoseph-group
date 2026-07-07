import Link from "next/link";
import { getBusinessUnitsAdmin } from "@/app/admin/_lib/data";
import BusinessUnitsList from "@/app/admin/_components/BusinessUnitsList";

export const dynamic = "force-dynamic";

export default async function BusinessUnitsAdminPage() {
  const rows = await getBusinessUnitsAdmin();

  return (
    <div>
      <Link href="/admin" className="font-mono text-[12px] text-ink-300 hover:text-white">
        ← Back
      </Link>
      <h1 className="mt-3 font-sans text-2xl font-semibold text-white">Business units</h1>
      <p className="mt-2 font-mono text-[13px] text-ink-300">
        Reorder, publish/hide, edit, add, or remove units. Order and visibility
        affect the home page and footer.
      </p>

      <div className="mt-8">
        <BusinessUnitsList initial={rows} />
      </div>
    </div>
  );
}
