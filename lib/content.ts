/**
 * ────────────────────────────────────────────────────────────────────────
 *  ST. JOSEPH GROUP — SITE CONTENT (EDITABLE PLACEHOLDERS)
 * ────────────────────────────────────────────────────────────────────────
 *  This is the single source of truth for all copy on the site.
 *  Replace the placeholder text below with the real company content.
 *  Everything (home sections + business-unit subpages + investor page)
 *  reads from here, so you only edit in one place.
 * ────────────────────────────────────────────────────────────────────────
 */

export const company = {
  name: "St. Joseph Group",
  legalName: "St. Joseph Group Holdings, Inc.",
  short: "SJG",
  tagline: "Creating Meaningful Lives",
  established: 1998,
  location: "Metro Manila, Philippines",
  email: "helpdesk@stjoseph-group.com",
  phone: "+63 (2) 8000 0000",
  address: "SJG Corporate Center, Ortigas Center, Pasig City, Philippines",
  intro:
    "A diversified Filipino holding company building enduring businesses across property, hospitality, healthcare, education and beyond — united by one purpose: creating meaningful lives.",
};

/* ── HERO ──────────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: "Diversified Holding Company",
  title: "One Group.",
  titleAccent: "Nine Businesses.",
  titleEnd: "A Shared Purpose.",
  subtitle:
    "St. Joseph Group brings together nine business units under a single vision — to create meaningful lives for our people, partners, and the communities we serve.",
  primaryCta: { label: "Explore Our Businesses", href: "#business-units" },
  secondaryCta: { label: "Investor Relations", href: "/investor-relations" },
  stats: [
    { value: "9", label: "Business Units" },
    { value: "25+", label: "Years of Growth" },
    { value: "8,000+", label: "Team Members" },
    { value: "12", label: "Provinces Served" },
  ],
};

/* ── BUSINESS UNITS (9) ────────────────────────────────────────────── */
export type BusinessUnit = {
  slug: string;
  name: string;
  short: string;
  sector: string;
  tagline: string;
  summary: string;
  description: string;
  accent: string; // hex used for the 3D + accents on the subpage
  founded: string;
  highlights: { label: string; value: string }[];
  services: string[];
};

export const businessUnits: BusinessUnit[] = [
  {
    slug: "realty-development",
    name: "St. Joseph Realty & Development",
    short: "SJ Realty",
    sector: "Property & Real Estate",
    tagline: "Building the places where meaningful lives happen.",
    summary:
      "Master-planned communities, residential towers, and mixed-use developments designed around people.",
    description:
      "St. Joseph Realty & Development shapes vibrant, sustainable communities across the Philippines. From master-planned townships to premium residential condominiums and mixed-use estates, we design places where families grow, businesses thrive, and neighbourhoods come alive.",
    accent: "#CC7B1D",
    founded: "2001",
    highlights: [
      { label: "Developments", value: "40+" },
      { label: "Hectares Master-planned", value: "1,200" },
      { label: "Homes Delivered", value: "18,000" },
    ],
    services: [
      "Master-planned townships",
      "Residential & condominium development",
      "Mixed-use & commercial estates",
      "Property management",
    ],
  },
  {
    slug: "construction-infrastructure",
    name: "St. Joseph Construction & Infrastructure",
    short: "SJ Construction",
    sector: "Construction & Engineering",
    tagline: "Engineering the foundations of progress.",
    summary:
      "Vertical and horizontal construction, infrastructure, and design-build delivered to global standards.",
    description:
      "Our construction and infrastructure arm delivers landmark projects with precision and integrity — high-rise towers, roads, bridges, and public infrastructure. We combine modern engineering, disciplined project management, and a relentless commitment to safety and quality.",
    accent: "#E89F00",
    founded: "2003",
    highlights: [
      { label: "Projects Completed", value: "220+" },
      { label: "Safety Record", value: "99.4%" },
      { label: "Peak Workforce", value: "3,500" },
    ],
    services: [
      "General contracting",
      "Infrastructure & civil works",
      "Design-build",
      "Project & construction management",
    ],
  },
  {
    slug: "hospitality-resorts",
    name: "St. Joseph Hospitality & Resorts",
    short: "SJ Hospitality",
    sector: "Hospitality & Leisure",
    tagline: "Warm Filipino hospitality, world-class experiences.",
    summary:
      "Hotels, resorts, and leisure destinations that turn travel into meaningful memories.",
    description:
      "St. Joseph Hospitality & Resorts operates a growing portfolio of hotels, island resorts, and leisure destinations. We are stewards of authentic Filipino hospitality — creating restorative, memorable experiences for local and international guests alike.",
    accent: "#229BF1",
    founded: "2006",
    highlights: [
      { label: "Properties", value: "14" },
      { label: "Keys", value: "2,300" },
      { label: "Guest Rating", value: "4.8/5" },
    ],
    services: [
      "Hotels & resorts",
      "Food & beverage",
      "Events & conventions",
      "Leisure & travel experiences",
    ],
  },
  {
    slug: "healthcare",
    name: "St. Joseph Healthcare",
    short: "SJ Healthcare",
    sector: "Health & Wellness",
    tagline: "Compassionate care, accessible to all.",
    summary:
      "Hospitals, clinics, and wellness services delivering quality care with a human touch.",
    description:
      "St. Joseph Healthcare brings quality, compassionate medicine closer to Filipino families through hospitals, multi-specialty clinics, diagnostics, and wellness programs. We pair clinical excellence with genuine care — because health is the foundation of a meaningful life.",
    accent: "#25AC1C",
    founded: "2009",
    highlights: [
      { label: "Facilities", value: "22" },
      { label: "Patients / Year", value: "1.1M" },
      { label: "Medical Staff", value: "1,800" },
    ],
    services: [
      "Hospitals & medical centers",
      "Multi-specialty clinics",
      "Diagnostics & laboratory",
      "Preventive & wellness care",
    ],
  },
  {
    slug: "education",
    name: "St. Joseph Academy",
    short: "SJ Academy",
    sector: "Education",
    tagline: "Nurturing the next generation of leaders.",
    summary:
      "Schools and learning institutions shaping capable, values-driven Filipinos.",
    description:
      "St. Joseph Academy nurtures learners from early education through higher learning and professional development. Rooted in strong values and future-ready skills, our institutions form well-rounded individuals prepared to lead meaningful lives and careers.",
    accent: "#93D4FF",
    founded: "2005",
    highlights: [
      { label: "Campuses", value: "9" },
      { label: "Students", value: "24,000" },
      { label: "Board Passing Rate", value: "94%" },
    ],
    services: [
      "Basic education (K–12)",
      "Higher education",
      "Technical & vocational training",
      "Corporate learning & scholarships",
    ],
  },
  {
    slug: "agri-ventures",
    name: "St. Joseph Agri-Ventures",
    short: "SJ Agri",
    sector: "Agribusiness",
    tagline: "From Filipino soil to the Filipino table.",
    summary:
      "Sustainable farming, food processing, and agri-supply chains that strengthen food security.",
    description:
      "St. Joseph Agri-Ventures advances sustainable agriculture, food processing, and modern agri-logistics. By partnering with local farmers and investing in technology, we strengthen food security while creating shared prosperity across rural communities.",
    accent: "#8FBF3F",
    founded: "2011",
    highlights: [
      { label: "Partner Farmers", value: "6,500" },
      { label: "Hectares Cultivated", value: "9,000" },
      { label: "Products", value: "120+" },
    ],
    services: [
      "Sustainable farming",
      "Food processing & manufacturing",
      "Cold chain & agri-logistics",
      "Farmer partnership programs",
    ],
  },
  {
    slug: "retail-trading",
    name: "St. Joseph Retail & Trading",
    short: "SJ Retail",
    sector: "Retail & Distribution",
    tagline: "Everyday essentials, everywhere Filipinos are.",
    summary:
      "Retail formats, distribution, and consumer brands serving communities nationwide.",
    description:
      "St. Joseph Retail & Trading connects quality products with everyday Filipinos through modern retail formats, nationwide distribution, and homegrown consumer brands. We make life more convenient, one community store and one delivery at a time.",
    accent: "#CC7B1D",
    founded: "2008",
    highlights: [
      { label: "Retail Outlets", value: "310" },
      { label: "SKUs Distributed", value: "40,000" },
      { label: "Cities Reached", value: "48" },
    ],
    services: [
      "Modern retail & convenience",
      "Wholesale & distribution",
      "Consumer brands",
      "E-commerce & fulfilment",
    ],
  },
  {
    slug: "financial-services",
    name: "St. Joseph Financial Services",
    short: "SJ Finance",
    sector: "Financial Services",
    tagline: "Empowering financial well-being.",
    summary:
      "Lending, insurance, and inclusive financial products that help Filipinos build futures.",
    description:
      "St. Joseph Financial Services provides accessible lending, insurance, and financial solutions for individuals and enterprises. We champion financial inclusion — helping families save, protect, and grow toward the meaningful lives they aspire to.",
    accent: "#229BF1",
    founded: "2013",
    highlights: [
      { label: "Clients Served", value: "480K" },
      { label: "Loans Disbursed", value: "₱18B" },
      { label: "Branches", value: "70" },
    ],
    services: [
      "Consumer & SME lending",
      "Insurance & protection",
      "Digital financial services",
      "Financial literacy programs",
    ],
  },
  {
    slug: "logistics-mobility",
    name: "St. Joseph Logistics & Mobility",
    short: "SJ Logistics",
    sector: "Logistics & Transport",
    tagline: "Moving goods, connecting the nation.",
    summary:
      "Freight, warehousing, and mobility solutions that keep the archipelago connected.",
    description:
      "St. Joseph Logistics & Mobility keeps the archipelago moving — with freight forwarding, warehousing, last-mile delivery, and integrated mobility solutions. Through smart networks and reliable service, we connect businesses and communities across the islands.",
    accent: "#E89F00",
    founded: "2015",
    highlights: [
      { label: "Fleet Units", value: "1,400" },
      { label: "Warehousing", value: "180K m²" },
      { label: "On-time Delivery", value: "98.2%" },
    ],
    services: [
      "Freight & forwarding",
      "Warehousing & distribution",
      "Last-mile & fulfilment",
      "Integrated mobility",
    ],
  },
];

/* ── EOS (Entrepreneurial Operating System) ────────────────────────── */
export const eos = {
  eyebrow: "How We Run — EOS",
  title: "One operating system across every business",
  intro:
    "St. Joseph Group runs on EOS® — the Entrepreneurial Operating System. It is the shared framework that keeps all nine business units aligned, accountable, and moving in the same direction, with the same disciplines and the same language.",
  components: [
    {
      key: "Vision",
      title: "Vision",
      desc: "Everyone in the organisation is crystal clear on where the company is going and how it will get there.",
    },
    {
      key: "People",
      title: "People",
      desc: "The right people in the right seats — great people who share our core values and excel in their roles.",
    },
    {
      key: "Data",
      title: "Data",
      desc: "A handful of numbers that give an absolute pulse on the business, cutting through subjective opinion.",
    },
    {
      key: "Issues",
      title: "Issues",
      desc: "A healthy habit of surfacing, discussing, and solving issues at the root — for good.",
    },
    {
      key: "Process",
      title: "Process",
      desc: "The core processes that make each business run, documented and followed by all.",
    },
    {
      key: "Traction",
      title: "Traction",
      desc: "Discipline and accountability — executing the vision through Rocks and a weekly meeting pulse.",
    },
  ],
};

/* ── CREATING MEANINGFUL LIVES ─────────────────────────────────────── */
export const meaningfulLives = {
  eyebrow: "Our Purpose",
  title: "Creating Meaningful Lives",
  body: "Everything we build serves a single purpose — to create meaningful lives. For our people, that means growth, dignity, and belonging. For our customers, it means products and experiences that genuinely improve their day. For our communities, it means opportunity, stewardship, and hope. Profit is the result; purpose is the reason.",
  pillars: [
    {
      title: "For Our People",
      desc: "Careers with growth, dignity, and a culture where people feel they truly belong.",
    },
    {
      title: "For Our Customers",
      desc: "Products, spaces, and services that measurably improve everyday life.",
    },
    {
      title: "For Our Communities",
      desc: "Long-term investment, environmental stewardship, and shared prosperity.",
    },
  ],
};

/* ── CORE FOCUS / MISSION / VISION ─────────────────────────────────── */
export const strategy = {
  coreFocus: {
    label: "Core Focus",
    purpose: "Creating meaningful lives.",
    niche:
      "Building and operating enduring businesses that make everyday life better for Filipinos.",
  },
  mission: {
    label: "Mission",
    text: "To build and grow world-class Filipino enterprises that serve people with excellence, integrity, and heart — creating value that lasts across generations.",
  },
  vision: {
    label: "Vision",
    text: "To be the most trusted and admired diversified group in the Philippines by 2035 — recognised for the meaningful lives we create and the communities we uplift.",
  },
};

/* ── 5 CORE VALUES ─────────────────────────────────────────────────── */
export const coreValues = [
  {
    num: "01",
    title: "Integrity",
    desc: "We do the right thing, especially when no one is watching. Our word is our bond.",
  },
  {
    num: "02",
    title: "Excellence",
    desc: "We pursue the highest standards in everything we build, serve, and deliver.",
  },
  {
    num: "03",
    title: "Stewardship",
    desc: "We care for what is entrusted to us — our people, resources, and the environment.",
  },
  {
    num: "04",
    title: "Compassion",
    desc: "We lead with empathy, treating every person with dignity and genuine care.",
  },
  {
    num: "05",
    title: "Bayanihan",
    desc: "We win together. Collaboration and community are woven into who we are.",
  },
];

/* ── JOURNEY & HISTORY ─────────────────────────────────────────────── */
export const journey = {
  eyebrow: "Our Journey",
  title: "A quarter-century of building",
  milestones: [
    {
      year: "1998",
      title: "The Beginning",
      desc: "St. Joseph Group is founded with a single enterprise and a bold conviction that business should create meaningful lives.",
    },
    {
      year: "2001",
      title: "Into Real Estate",
      desc: "St. Joseph Realty & Development launches, breaking ground on our first master-planned community.",
    },
    {
      year: "2006",
      title: "Hospitality & Beyond",
      desc: "We expand into hospitality and healthcare, taking our first steps toward a diversified group.",
    },
    {
      year: "2013",
      title: "Financial Inclusion",
      desc: "St. Joseph Financial Services opens, extending our purpose to financial well-being.",
    },
    {
      year: "2019",
      title: "One Operating System",
      desc: "The group adopts EOS® across all business units — aligning the entire organisation on one framework.",
    },
    {
      year: "2024",
      title: "Nine and Growing",
      desc: "St. Joseph Group operates nine business units, over 8,000 team members, and a shared purpose that endures.",
    },
  ],
};

/* ── GREAT PLACE TO WORK ───────────────────────────────────────────── */
export const greatPlace = {
  eyebrow: "Our Culture",
  title: "A certified Great Place To Work®",
  body: "We believe meaningful lives begin at work. Our people-first culture, growth opportunities, and shared values make St. Joseph Group a place where careers — and people — flourish.",
  stats: [
    { value: "92%", label: "Employee trust index" },
    { value: "4.7/5", label: "Employee satisfaction" },
    { value: "89%", label: "Would recommend as a workplace" },
    { value: "8,000+", label: "Team members and growing" },
  ],
  badges: [
    "Great Place To Work® Certified",
    "Top Employer Philippines",
    "Best Companies to Work For — Asia",
  ],
};

/* ── TESTIMONIALS ──────────────────────────────────────────────────── */
export const testimonials = [
  {
    quote:
      "St. Joseph Group has been more than an employer — it has been a place where I've grown as a leader and as a person. The purpose here is real.",
    name: "Maria Santos",
    role: "Regional Director, SJ Healthcare",
  },
  {
    quote:
      "Working across the group, you feel the alignment. Nine businesses, one language, one set of values. It makes execution remarkably clear.",
    name: "David Reyes",
    role: "Head of Operations, SJ Logistics",
  },
  {
    quote:
      "As a partner-farmer for eight years, SJ Agri-Ventures gave my family stability and a future. That is what meaningful means to me.",
    name: "Rodel Cruz",
    role: "Partner Farmer, SJ Agri-Ventures",
  },
  {
    quote:
      "The professionalism and long-term thinking of St. Joseph Group make them the kind of partner every serious investor looks for.",
    name: "Angela Lim",
    role: "Managing Partner, Institutional Investor",
  },
];

/* ── CAREERS ───────────────────────────────────────────────────────── */
export const careers = {
  eyebrow: "Careers",
  title: "Build a meaningful career with us",
  body: "Across nine industries and one shared purpose, there is a place for you at St. Joseph Group. Explore roles where your work truly matters.",
  perks: [
    "Careers across 9 diverse industries",
    "Structured growth & leadership development",
    "Comprehensive health & wellness benefits",
    "A certified Great Place To Work® culture",
  ],
  openings: [
    { role: "Project Manager", unit: "SJ Construction", location: "Pasig City", type: "Full-time" },
    { role: "Registered Nurse", unit: "SJ Healthcare", location: "Cebu City", type: "Full-time" },
    { role: "Guest Experience Lead", unit: "SJ Hospitality", location: "Siargao", type: "Full-time" },
    { role: "Data Analyst", unit: "Group Shared Services", location: "Pasig City", type: "Hybrid" },
    { role: "Branch Officer", unit: "SJ Finance", location: "Davao City", type: "Full-time" },
    { role: "Supply Chain Associate", unit: "SJ Logistics", location: "Laguna", type: "Full-time" },
  ],
  cta: { label: "View all openings", href: "#" },
};

/* ── INVESTOR RELATIONS ────────────────────────────────────────────── */
export const investor = {
  eyebrow: "Investor Relations",
  title: "Partnering for enduring value",
  intro:
    "St. Joseph Group is committed to disciplined growth, transparent governance, and long-term value creation across our diversified portfolio. Explore our performance, governance, and reports.",
  metrics: [
    { value: "₱120B", label: "Group Revenue (FY2024)", note: "+14% year-on-year" },
    { value: "₱38B", label: "EBITDA", note: "31.6% margin" },
    { value: "9", label: "Operating Business Units", note: "Diversified across sectors" },
    { value: "AA−", label: "Domestic Credit Rating", note: "Stable outlook" },
  ],
  performance: [
    { year: "2020", revenue: 74 },
    { year: "2021", revenue: 82 },
    { year: "2022", revenue: 95 },
    { year: "2023", revenue: 105 },
    { year: "2024", revenue: 120 },
  ],
  governance: [
    {
      title: "Board & Governance",
      desc: "An independent, experienced board oversees strategy, risk, and accountability across the group.",
    },
    {
      title: "Sustainability (ESG)",
      desc: "Environmental stewardship and social impact are embedded in how each business unit operates.",
    },
    {
      title: "Risk Management",
      desc: "A group-wide enterprise risk framework protects value and ensures resilience.",
    },
  ],
  reports: [
    { title: "Annual Report 2024", type: "PDF", size: "8.2 MB" },
    { title: "Q4 2024 Financial Results", type: "PDF", size: "2.1 MB" },
    { title: "Sustainability Report 2024", type: "PDF", size: "5.6 MB" },
    { title: "Corporate Governance Manual", type: "PDF", size: "1.4 MB" },
  ],
  contact: {
    name: "Investor Relations Office",
    email: "investors@stjoseph-group.com",
    phone: "+63 (2) 8000 0100",
  },
};

/* ── CONTACT ───────────────────────────────────────────────────────── */
export const contact = {
  eyebrow: "Get in Touch",
  title: "Let's build something meaningful",
  body: "Whether you're a customer, partner, investor, or future team member — we'd love to hear from you.",
  channels: [
    { label: "General Inquiries", value: company.email },
    { label: "Investor Relations", value: "investors@stjoseph-group.com" },
    { label: "Careers", value: "careers@stjoseph-group.com" },
    { label: "Media", value: "media@stjoseph-group.com" },
  ],
};

/* ── NAV ───────────────────────────────────────────────────────────── */
export const nav = [
  { label: "Businesses", href: "/#business-units" },
  { label: "Purpose", href: "/#purpose" },
  { label: "EOS", href: "/#eos" },
  { label: "Journey", href: "/#journey" },
  { label: "Careers", href: "/#careers" },
  { label: "Investors", href: "/investor-relations" },
];
