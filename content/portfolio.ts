export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  image: string;
  summary: string;
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

export const projects: Project[] = [
  {
    slug: "project-one",
    number: "01",
    title: "Project Name 01",
    category: "Website / Development",
    image: "/images/project-01.svg",
    summary:
      "Introduce the project, its purpose, and the people it was made for. Replace this sample with a real project description.",
  },
  {
    slug: "project-two",
    number: "02",
    title: "Project Name 02",
    category: "Digital / Design",
    image: "/images/project-02.svg",
    summary:
      "Describe the problem behind this project and the idea that shaped your solution. This is placeholder case study content.",
  },
  {
    slug: "project-three",
    number: "03",
    title: "Project Name 03",
    category: "Website / Design & development",
    image: "/images/project-03.svg",
    summary:
      "Share the context, your contribution, and the final experience. Replace this sample with details from your own work.",
  },
];
