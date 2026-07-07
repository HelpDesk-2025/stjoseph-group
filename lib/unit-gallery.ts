/**
 * Default business-unit imagery (Unsplash), shared by the seed script and the
 * BusinessUnits component's fallback. Once images are uploaded via the admin
 * they live in the `business_units.gallery` / `hero_image` columns and these
 * defaults are only used when a unit has none.
 */

export const px = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const UNIT_GALLERY_IDS: Record<string, string[]> = {
  "realty-development": [
    "1560518883-ce09059eeffa",
    "1512917774080-9991f1c4c750",
    "1600585154340-be6161a56a0c",
  ],
  "construction-infrastructure": [
    "1541888946425-d81bb19240f5",
    "1504307651254-35680f356dfd",
    "1523217582562-09d0def993a6",
  ],
  "hospitality-resorts": [
    "1566073771259-6a8506099945",
    "1571896349842-33c89424de2d",
    "1520250497591-112f2f40a3f4",
  ],
  healthcare: [
    "1519494026892-80bbd2d6fd0d",
    "1538108149393-fbbd81895907",
    "1576091160399-112ba8d25d1d",
  ],
  education: [
    "1523240795612-9a054b0db644",
    "1541339907198-e08756dedf3f",
    "1509062522246-3755977927d7",
  ],
  "agri-ventures": [
    "1500382017468-9049fed747ef",
    "1574943320219-553eb213f72d",
    "1625246333195-78d9c38ad449",
  ],
  "retail-trading": [
    "1441986300917-64674bd600d8",
    "1481437156560-3205f6a55735",
    "1567401893414-76b7b1e5a7a5",
  ],
  "financial-services": [
    "1526304640581-d334cdbbf45e",
    "1554224155-6726b3ff858f",
    "1611974789855-9c2a0a7236a3",
  ],
  "logistics-mobility": [
    "1586528116311-ad8dd3c8310d",
    "1494412574643-ff11b0a5c1c3",
    "1553413077-190dd305871c",
  ],
};

/** Full Unsplash URLs for a slug's default gallery. */
export function fallbackGallery(slug: string, w = 1200): string[] {
  return (UNIT_GALLERY_IDS[slug] ?? []).map((id) => px(id, w));
}
