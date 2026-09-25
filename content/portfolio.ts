export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  image: string;
  thumbnail: string;
  summary: string;
  url?: string;
  overview?: string;
  challenge?: string;
  outcome?: string;
  tags?: string[];
};

// Replace these clearly labeled samples with real work before publishing.
export const portfolio = {
  name: "dybdev",
  year: "2026",
  email: "", // Add your real email to enable the contact link.
  avatar: "/images/profile.png",
  introduction:
    "Add a short introduction here — who you are, what you do, and the kind of work you want to put into the world.",
  approach:
    "Share your approach to a project, the details you care about, and what a collaboration with you looks like.",
};

// Add your real profile URLs to activate these footer links.
export const socials = [
  { label: "GitHub", href: "" },
  { label: "LinkedIn", href: "" },
  { label: "Instagram", href: "" },
];

export const projects: Project[] = [
  {
    slug: "pines-va",
    number: "01",
    title: "Pines VA",
    category: "Web Platform / Remote Staffing",
    image: "/images/project-pinesva.png",
    thumbnail: "/images/pines-va.png",
    url: "https://www.thepinesva.com/",
    summary:
      "A dedicated virtual assistant staffing platform connecting growing businesses with pre-vetted executive, medical, sales, and administrative support specialists.",
    overview:
      "Pines VA streamlines remote talent matching for businesses needing specialized assistance across operations, healthcare administration, and client outreach. Built with a focus on trust, clear onboarding flows, and enterprise-grade data security protocols.",
    challenge:
      "Designing a modern, trustworthy digital presence that clearly differentiates specialized VA services (general, executive, medical, and inside sales) while simplifying the consultation and booking process for prospective clients.",
    outcome:
      "Delivered an accessible, responsive platform featuring clear service tiers, transparent security assurances (HIPAA compliance, strict confidentiality NDAs), and streamlined inquiry forms that drive qualified client consultations.",
    tags: ["Next.js", "Tailwind CSS", "Remote Staffing", "HIPAA Compliant"],
  },
  {
    slug: "zero-scripts",
    number: "02",
    title: "Zero Scripts",
    category: "E-Commerce / FiveM Resource Platform",
    image: "/images/project-zeroscripts.png",
    thumbnail: "/images/zero-scripts.png",
    url: "https://zero-scripts.vercel.app/",
    summary:
      "Performance-first FiveM gaming resources platform and digital storefront featuring secure server-authoritative validation, clean framework integrations, and comprehensive documentation.",
    overview:
      "Zero Scripts provides production-ready game server assets and systems built for performance, security, and developer maintainability. Integrated with Tebex checkout and framework adapters for Qbox, QBCore, and ESX environments.",
    challenge:
      "Creating a high-performance storefront and documentation hub with low-latency client paths, server-authoritative validation to prevent exploits, and multi-currency checkout support tailored for gaming server communities.",
    outcome:
      "Engineered a sleek, dark-themed storefront featuring real-time resource cataloging, seamless cart workflows via Tebex API, versioned developer guides, and modular framework adapters.",
    tags: ["Next.js", "FiveM", "Tebex API", "TypeScript", "E-Commerce"],
  },
  {
    slug: "dyb-portfolio",
    number: "03",
    title: "dybdev Portfolio",
    category: "Portfolio / Editorial Web Experience",
    image: "/images/project-portfolio.png",
    thumbnail: "/images/dybdev-portfolio.png",
    url: "https://dyb-portfolio-eta.vercel.app/",
    summary:
      "A minimalist, typography-led personal portfolio website exploring considered monochrome aesthetics, fluid spring interactions, and purposeful digital design.",
    overview:
      "A showcase of modern web craftsmanship focusing on clean typography, negative space, responsive design systems, and subtle physics-based micro-interactions.",
    challenge:
      "Developing a restrained monochrome design system that communicates elegance and distinct personality without relying on heavy gradients or decorative noise.",
    outcome:
      "Built a high-performance editorial web experience featuring fluid card interactions, seamless dark and light theme switching, and accessible layout standards.",
    tags: ["Next.js", "Motion", "Tailwind CSS", "Editorial Design"],
  },
];
