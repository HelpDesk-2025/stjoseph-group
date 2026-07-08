/**
 * Declarative schemas that drive the generic content editor. Each key maps to
 * a `site_content` row; the field tree mirrors the shape exported from
 * `lib/content.ts`. Add a section here to make it editable — no new page needed.
 *
 * Most sections are objects (use `fields`). A few (coreValues, nav) are stored
 * as a bare array — those use `rootList` instead.
 */

export type Field =
  | { name: string; label: string; kind: "text" }
  | { name: string; label: string; kind: "textarea" }
  | { name: string; label: string; kind: "group"; fields: Field[] }
  | { name: string; label: string; kind: "objectlist"; itemLabel: string; fields: Field[] }
  | { name: string; label: string; kind: "stringlist" }
  | { name: string; label: string; kind: "image"; folder?: string }
  | { name: string; label: string; kind: "imagelist"; folder?: string };

export type SectionSchema = {
  key: string;
  title: string;
  description?: string;
  /** For object-shaped sections. */
  fields?: Field[];
  /** For sections whose stored data is a bare array. */
  rootList?: {
    kind: "objectlist" | "stringlist";
    itemLabel: string;
    fields?: Field[];
  };
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
      { name: "logo", label: "Site logo (header/footer)", kind: "image", folder: "brand" },
      { name: "favicon", label: "Favicon (browser tab)", kind: "image", folder: "brand" },
      { name: "ogImage", label: "Social share image (OG)", kind: "image", folder: "brand" },
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
  eos: {
    key: "eos",
    title: "EOS section",
    description: "The operating-system section with its six components.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "intro", label: "Intro", kind: "textarea" },
      {
        name: "components",
        label: "Components",
        kind: "objectlist",
        itemLabel: "Component",
        fields: [
          { name: "key", label: "Key (id)", kind: "text" },
          { name: "title", label: "Title", kind: "text" },
          { name: "desc", label: "Description", kind: "textarea" },
        ],
      },
    ],
  },
  journey: {
    key: "journey",
    title: "Journey / timeline",
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      {
        name: "milestones",
        label: "Milestones",
        kind: "objectlist",
        itemLabel: "Milestone",
        fields: [
          { name: "year", label: "Year", kind: "text" },
          { name: "title", label: "Title", kind: "text" },
          { name: "desc", label: "Description", kind: "textarea" },
        ],
      },
    ],
  },
  greatPlace: {
    key: "greatPlace",
    title: "Great place to work",
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "body", label: "Body", kind: "textarea" },
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
      { name: "badges", label: "Badges", kind: "stringlist" },
    ],
  },
  careers: {
    key: "careers",
    title: "Careers",
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "body", label: "Body", kind: "textarea" },
      { name: "perks", label: "Perks", kind: "stringlist" },
      {
        name: "openings",
        label: "Openings",
        kind: "objectlist",
        itemLabel: "Opening",
        fields: [
          { name: "role", label: "Role", kind: "text" },
          { name: "unit", label: "Business unit", kind: "text" },
          { name: "location", label: "Location", kind: "text" },
          { name: "type", label: "Type", kind: "text" },
        ],
      },
      cta("cta", "Call to action"),
    ],
  },
  investor: {
    key: "investor",
    title: "Investor relations",
    description: "The /investor-relations page.",
    fields: [
      { name: "eyebrow", label: "Eyebrow", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "intro", label: "Intro", kind: "textarea" },
      {
        name: "metrics",
        label: "Metrics",
        kind: "objectlist",
        itemLabel: "Metric",
        fields: [
          { name: "value", label: "Value", kind: "text" },
          { name: "label", label: "Label", kind: "text" },
          { name: "note", label: "Note", kind: "text" },
        ],
      },
      {
        name: "performance",
        label: "Performance (revenue chart)",
        kind: "objectlist",
        itemLabel: "Year",
        fields: [
          { name: "year", label: "Year", kind: "text" },
          { name: "revenue", label: "Revenue (number)", kind: "text" },
        ],
      },
      {
        name: "governance",
        label: "Governance",
        kind: "objectlist",
        itemLabel: "Item",
        fields: [
          { name: "title", label: "Title", kind: "text" },
          { name: "desc", label: "Description", kind: "textarea" },
        ],
      },
      {
        name: "reports",
        label: "Reports",
        kind: "objectlist",
        itemLabel: "Report",
        fields: [
          { name: "title", label: "Title", kind: "text" },
          { name: "type", label: "Type", kind: "text" },
          { name: "size", label: "Size", kind: "text" },
        ],
      },
      {
        name: "contact",
        label: "IR contact",
        kind: "group",
        fields: [
          { name: "name", label: "Name", kind: "text" },
          { name: "email", label: "Email", kind: "text" },
          { name: "phone", label: "Phone", kind: "text" },
        ],
      },
    ],
  },
  coreValues: {
    key: "coreValues",
    title: "Core values",
    rootList: {
      kind: "objectlist",
      itemLabel: "Value",
      fields: [
        { name: "num", label: "Number", kind: "text" },
        { name: "title", label: "Title", kind: "text" },
        { name: "desc", label: "Description", kind: "textarea" },
      ],
    },
  },
  nav: {
    key: "nav",
    title: "Navigation",
    description: "Header navigation links.",
    rootList: {
      kind: "objectlist",
      itemLabel: "Link",
      fields: [
        { name: "label", label: "Label", kind: "text" },
        { name: "href", label: "Link (href)", kind: "text" },
      ],
    },
  },
};

/** Schema for editing a single business unit (saved via saveBusinessUnit). */
export const businessUnitSchema: SectionSchema = {
  key: "businessUnit",
  title: "Business unit",
  fields: [
    { name: "name", label: "Name", kind: "text" },
    { name: "short", label: "Short name", kind: "text" },
    { name: "sector", label: "Sector", kind: "text" },
    { name: "tagline", label: "Tagline", kind: "text" },
    { name: "summary", label: "Summary", kind: "textarea" },
    { name: "description", label: "Description", kind: "textarea" },
    { name: "accent", label: "Accent colour (hex)", kind: "text" },
    { name: "founded", label: "Founded", kind: "text" },
    { name: "logo", label: "Marquee logo (hero strip)", kind: "image", folder: "logos" },
    { name: "page_logo", label: "Unit page logo (badge + related)", kind: "image", folder: "logos" },
    { name: "hero_image", label: "Hero image", kind: "image", folder: "business-units" },
    { name: "gallery", label: "Gallery images", kind: "imagelist", folder: "business-units" },
    {
      name: "highlights",
      label: "Highlights",
      kind: "objectlist",
      itemLabel: "Highlight",
      fields: [
        { name: "label", label: "Label", kind: "text" },
        { name: "value", label: "Value", kind: "text" },
      ],
    },
    { name: "services", label: "Services", kind: "stringlist" },
  ],
};

/** Sections shown on the dashboard. `available` = editable via the generic editor. */
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
  { key: "eos", title: "EOS section", href: "/admin/content/eos", available: true },
  { key: "coreValues", title: "Core values", href: "/admin/content/coreValues", available: true },
  { key: "journey", title: "Journey / timeline", href: "/admin/content/journey", available: true },
  { key: "greatPlace", title: "Great place to work", href: "/admin/content/greatPlace", available: true },
  { key: "careers", title: "Careers", href: "/admin/content/careers", available: true },
  { key: "investor", title: "Investor relations", href: "/admin/content/investor", available: true },
  { key: "contact", title: "Contact section", href: "/admin/content/contact", available: true },
  { key: "nav", title: "Navigation", href: "/admin/content/nav", available: true },
];

/** Collections that have their own dedicated editors (not site_content). */
export const COLLECTION_SECTIONS: { title: string; href: string; description: string }[] = [
  { title: "Business units", href: "/admin/business-units", description: "9 units · reorder, edit, publish" },
  { title: "Testimonials", href: "/admin/testimonials", description: "Quotes shown on the home page" },
];
