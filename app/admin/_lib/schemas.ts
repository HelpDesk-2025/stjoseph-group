/**
 * Declarative schemas that drive the generic content editor. Each key maps to
 * a `site_content` row; the field tree mirrors the shape exported from
 * `lib/content.ts`. Add a section here (Phase 2) to make it editable — no new
 * page needed.
 */

export type Field =
  | { name: string; label: string; kind: "text" }
  | { name: string; label: string; kind: "textarea" }
  | { name: string; label: string; kind: "group"; fields: Field[] }
  | { name: string; label: string; kind: "objectlist"; itemLabel: string; fields: Field[] }
  | { name: string; label: string; kind: "stringlist" };

export type SectionSchema = {
  key: string;
  title: string;
  description?: string;
  fields: Field[];
};

const cta = (name: string, label: string): Field => ({
  name,
  label,
  kind: "group",
  fields: [
    { name: "label", label: "Button label", kind: "text" },
    { name: "href", label: "Link (href)", kind: "text" },
  ],
});

export const sectionSchemas: Record<string, SectionSchema> = {
  company: {
    key: "company",
    title: "Company details",
    description: "Name, tagline, and contact info used across the header, footer, and metadata.",
    fields: [
      { name: "name", label: "Name", kind: "text" },
      { name: "legalName", label: "Legal name", kind: "text" },
      { name: "short", label: "Short name", kind: "text" },
      { name: "tagline", label: "Tagline", kind: "text" },
      { name: "established", label: "Established (year)", kind: "text" },
      { name: "location", label: "Location", kind: "text" },
      { name: "email", label: "Email", kind: "text" },
      { name: "phone", label: "Phone", kind: "text" },
      { name: "address", label: "Address", kind: "text" },
      { name: "intro", label: "Intro paragraph", kind: "textarea" },
    ],
  },
  hero: {
    key: "hero",
    title: "Hero section",
    description: "The top of the home page.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title line 1", kind: "text" },
      { name: "titleAccent", label: "Title line 2 (accent)", kind: "text" },
      { name: "titleEnd", label: "Title line 3", kind: "text" },
      { name: "subtitle", label: "Subtitle", kind: "textarea" },
      cta("primaryCta", "Primary button"),
      cta("secondaryCta", "Secondary button"),
      {
        name: "stats",
        label: "Stats",
        kind: "objectlist",
        itemLabel: "Stat",
        fields: [
          { name: "value", label: "Value", kind: "text" },
          { name: "label", label: "Label", kind: "text" },
        ],
      },
    ],
  },
  meaningfulLives: {
    key: "meaningfulLives",
    title: "Purpose section",
    description: '"Creating Meaningful Lives" section.',
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "body", label: "Body", kind: "textarea" },
      {
        name: "pillars",
        label: "Pillars",
        kind: "objectlist",
        itemLabel: "Pillar",
        fields: [
          { name: "title", label: "Title", kind: "text" },
          { name: "desc", label: "Description", kind: "textarea" },
        ],
      },
    ],
  },
  strategy: {
    key: "strategy",
    title: "Strategy section",
    description: "Core focus, mission, and vision.",
    fields: [
      {
        name: "coreFocus",
        label: "Core focus",
        kind: "group",
        fields: [
          { name: "label", label: "Label", kind: "text" },
          { name: "purpose", label: "Purpose", kind: "text" },
          { name: "niche", label: "Niche", kind: "textarea" },
        ],
      },
      {
        name: "mission",
        label: "Mission",
        kind: "group",
        fields: [
          { name: "label", label: "Label", kind: "text" },
          { name: "text", label: "Text", kind: "textarea" },
        ],
      },
      {
        name: "vision",
        label: "Vision",
        kind: "group",
        fields: [
          { name: "label", label: "Label", kind: "text" },
          { name: "text", label: "Text", kind: "textarea" },
        ],
      },
    ],
  },
  contact: {
    key: "contact",
    title: "Contact section",
    description: "Heading and contact channels on the home page.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "body", label: "Body", kind: "textarea" },
      {
        name: "channels",
        label: "Channels",
        kind: "objectlist",
        itemLabel: "Channel",
        fields: [
          { name: "label", label: "Label", kind: "text" },
          { name: "value", label: "Email / value", kind: "text" },
        ],
      },
    ],
  },
};

/** Sections shown on the dashboard. `available` = editable in this build. */
export const DASHBOARD_SECTIONS: {
  key: string;
  title: string;
  href?: string;
  available: boolean;
}[] = [
  { key: "company", title: "Company details", href: "/admin/content/company", available: true },
  { key: "hero", title: "Hero section", href: "/admin/content/hero", available: true },
  { key: "meaningfulLives", title: "Purpose section", href: "/admin/content/meaningfulLives", available: true },
  { key: "strategy", title: "Strategy section", href: "/admin/content/strategy", available: true },
  { key: "contact", title: "Contact section", href: "/admin/content/contact", available: true },
  { key: "eos", title: "EOS section", available: false },
  { key: "coreValues", title: "Core values", available: false },
  { key: "journey", title: "Journey / timeline", available: false },
  { key: "greatPlace", title: "Great place to work", available: false },
  { key: "careers", title: "Careers", available: false },
  { key: "investor", title: "Investor relations", available: false },
  { key: "nav", title: "Navigation", available: false },
  { key: "businessUnits", title: "Business units", available: false },
  { key: "testimonials", title: "Testimonials", available: false },
];
