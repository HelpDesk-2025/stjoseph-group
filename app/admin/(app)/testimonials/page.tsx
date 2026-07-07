import Link from "next/link";
import { getTestimonialsAdmin } from "@/app/admin/_lib/data";
import TestimonialsEditor from "@/app/admin/_components/TestimonialsEditor";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  const rows = await getTestimonialsAdmin();

  return (
    <div>
      <Link href="/admin" className="font-mono text-[12px] text-ink-300 hover:text-white">
        ← Back
      </Link>
      <h1 className="mt-3 font-sans text-2xl font-semibold text-white">Testimonials</h1>
      <p className="mt-2 font-mono text-[13px] text-ink-300">
        Quotes shown in the home page carousel. Reorder, hide, add, or remove.
      </p>

      <div className="mt-8">
        <TestimonialsEditor initial={rows} />
      </div>
    </div>
  );
}
