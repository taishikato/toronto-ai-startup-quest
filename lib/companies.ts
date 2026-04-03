export const COMPANY_CATEGORIES = [
  "Core Labs",
  "Consumer AI",
  "Devtools",
  "Infra",
  "Agents",
  "Vertical AI",
] as const

export type CompanyCategory = (typeof COMPANY_CATEGORIES)[number]

/**
 * Distinct, saturated hues for map + UI so categories read clearly against
 * green/tan terrain and blue water (avoid muted earth tones that blend in).
 */
export const CATEGORY_COLORS: Record<CompanyCategory, string> = {
  "Core Labs": "#d32f2f",
  "Consumer AI": "#00897b",
  Devtools: "#fbc02d",
  Infra: "#7b1fa2",
  Agents: "#1565c0",
  "Vertical AI": "#e65100",
}

/** Text on filled category pills in the sidebar. */
export function categoryPillForeground(
  category: CompanyCategory
): "#ffffff" | "#1a1a2e" {
  return category === "Devtools" ? "#1a1a2e" : "#ffffff"
}

export type Company = {
  slug: string
  name: string
  website: string
  shortDescription: string
  whyItMatters: string
  category: CompanyCategory
  locationLabel: string
  coordinates: [number, number]
  founded: number
  logoUrl?: string
  /** When true, the card is omitted from the sidebar until the user searches. */
  hideFromSidebar?: boolean
  /** Map marker style — "boss" uses a larger, high-threat sprite. */
  mapSprite?: "default" | "boss"
  sourceUrl: string
  sourceLabel: string
}

/**
 * Legacy constant kept for map-shell compatibility.
 * The Toronto map does not append a separate non-startup boss marker.
 */
export const YC_BOSS_SLUG = "__no-boss__" as const

export function getCompanyMonogram(company: Company) {
  const parts = company.name
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)

  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }

  return company.name.slice(0, 2).toUpperCase()
}

export function getCompanyDomain(company: Company) {
  return new URL(company.website).hostname
}

export function getCompanyLogoUrl(company: Company) {
  if (company.logoUrl) {
    return company.logoUrl
  }

  const domain = getCompanyDomain(company)

  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

// Only Toronto AI-native startups with public, source-backed Toronto locations
// are included below.
export const COMPANIES: Company[] = [
  {
    slug: "cohere",
    name: "Cohere",
    website: "https://cohere.com",
    shortDescription:
      "Enterprise AI platform building large language models and products for business use.",
    whyItMatters:
      "Toronto's best-known foundation-model company and a clear anchor for the local AI scene.",
    category: "Core Labs",
    locationLabel: "171 John Street, Suite 200, Toronto, ON M5T 1X3",
    coordinates: [-79.3910699, 43.6507434],
    founded: 2019,
    sourceUrl: "https://cohere.com/ja/privacy",
    sourceLabel: "Cohere privacy policy",
  },
  {
    slug: "ada",
    name: "Ada",
    website: "https://www.ada.cx",
    shortDescription:
      "AI agent platform for automating customer service across chat, email, and voice.",
    whyItMatters:
      "One of Toronto's clearest AI agent companies, with a focused enterprise product and real scale.",
    category: "Agents",
    locationLabel: "46 Spadina Avenue, Suite 500, Toronto, ON M5V 2H8",
    coordinates: [-79.3949564, 43.6446789],
    founded: 2016,
    sourceUrl: "https://www.ada.cx/legal/website-cookies/",
    sourceLabel: "Ada legal resources page",
  },
  {
    slug: "benchsci",
    name: "BenchSci",
    website: "https://www.benchsci.com",
    shortDescription:
      "AI platform that helps scientists plan experiments and navigate disease biology faster.",
    whyItMatters:
      "A flagship Toronto life-sciences AI company with a product built around machine intelligence from day one.",
    category: "Vertical AI",
    locationLabel: "559 College St. Suite 201, Toronto, ON M6G 1A9",
    coordinates: [-79.4123002, 43.6551929],
    founded: 2015,
    sourceUrl: "https://www.benchsci.com/contact",
    sourceLabel: "BenchSci contact page",
  },
  {
    slug: "deep-genomics",
    name: "Deep Genomics",
    website: "https://www.deepgenomics.com",
    shortDescription:
      "AI-powered drug discovery company focused on RNA biology and therapeutic development.",
    whyItMatters:
      "An established Toronto AI-native biotech using predictive models as the core of its product strategy.",
    category: "Vertical AI",
    locationLabel: "480 University Avenue, Suite 1300, Toronto, ON M5G 1V2",
    coordinates: [-79.3890234, 43.6550868],
    founded: 2015,
    sourceUrl: "https://www.deepgenomics.com/privacy-policy",
    sourceLabel: "Deep Genomics privacy policy",
  },
  {
    slug: "blue-j",
    name: "Blue J",
    website: "https://www.bluej.com",
    shortDescription:
      "Generative AI research platform for tax and legal workflows.",
    whyItMatters:
      "A Toronto legal AI company that turned specialized professional research into a focused AI product.",
    category: "Vertical AI",
    locationLabel: "225 King Street West, Suite 1405, Toronto, ON M5V 3M2",
    coordinates: [-79.3881892, 43.6466584],
    founded: 2015,
    sourceUrl: "https://www.bluej.com/ca/data-processing-agreement",
    sourceLabel: "Blue J data processing agreement",
  },
  {
    slug: "wisedocs",
    name: "Wisedocs",
    website: "https://www.wisedocs.ai",
    shortDescription:
      "AI platform that turns medical records and claim files into structured review outputs.",
    whyItMatters:
      "Represents Toronto's vertical AI strength in insurance and claims operations.",
    category: "Vertical AI",
    locationLabel: "30 Duncan Street #701, Toronto, ON",
    coordinates: [-79.3892882, 43.6489309],
    founded: 2019,
    sourceUrl: "https://www.wisedocs.ai/trust-center",
    sourceLabel: "Wisedocs trust center",
  },
  {
    slug: "bluedot",
    name: "BlueDot",
    website: "https://bluedot.global",
    shortDescription:
      "AI-powered infectious disease intelligence for governments, hospitals, and enterprises.",
    whyItMatters:
      "A Toronto company with a distinctive AI use case in global health and outbreak prediction.",
    category: "Vertical AI",
    locationLabel: "207 Queens Quay West, Unit 820, Toronto, ON M5J 1A7",
    coordinates: [-79.3804374, 43.6383846],
    founded: 2013,
    sourceUrl: "https://bluedot.global/privacy-policy/",
    sourceLabel: "BlueDot privacy policy",
  },
  {
    slug: "private-ai",
    name: "Private AI",
    website: "https://www.private-ai.com",
    shortDescription:
      "Privacy-preserving AI company that detects, redacts, and replaces personal data in text and files.",
    whyItMatters:
      "A notable Toronto infrastructure company focused on making AI systems safer to deploy.",
    category: "Infra",
    locationLabel: "192 Spadina Avenue, Toronto, ON M5T 2C2",
    coordinates: [-79.3975316, 43.6499323],
    founded: 2019,
    sourceUrl: "https://www.private-ai.com/en/privacy-statement",
    sourceLabel: "Private AI privacy statement",
  },
  {
    slug: "nuralogix",
    name: "NuraLogix",
    website: "https://www.nuralogix.ai",
    shortDescription:
      "AI health monitoring platform that analyzes facial blood flow from a short camera scan.",
    whyItMatters:
      "A Toronto health AI company with a distinctive computer-vision product and clearly documented local HQ.",
    category: "Vertical AI",
    locationLabel: "250 University Avenue, Suite 209, Toronto, ON M5H 3E5",
    coordinates: [-79.3869845, 43.6503564],
    founded: 2015,
    sourceUrl: "https://www.nuralogix.ai/terms-of-use/",
    sourceLabel: "NuraLogix terms of use",
  },
  {
    slug: "nationgraph",
    name: "NationGraph",
    website: "https://www.nationgraph.com",
    shortDescription:
      "AI-driven sales intelligence platform for public-sector business development.",
    whyItMatters:
      "A Toronto-present company building AI workflows around government procurement and sales intelligence.",
    category: "Agents",
    locationLabel: "180 Dundas St W, Toronto, ON M5G 1Z8",
    coordinates: [-79.3866688, 43.6554784],
    founded: 2024,
    sourceUrl: "https://ca.linkedin.com/company/nationgraph",
    sourceLabel: "NationGraph LinkedIn company profile",
  },
  {
    slug: "thred",
    name: "Thred",
    website: "https://www.thred.ai",
    shortDescription:
      "AI buyer signal platform that detects when companies research you via ChatGPT, Gemini, Claude, or Perplexity.",
    whyItMatters:
      "A Toronto startup pioneering a new category of GTM intelligence built around AI search behavior.",
    category: "Vertical AI",
    locationLabel: "20 John Street, Toronto, ON",
    coordinates: [-79.38941, 43.64418],
    founded: 2024,
    logoUrl: "/logos/thred.png",
    sourceUrl: "https://www.thred.ai",
    sourceLabel: "Thred website",
  },
]
