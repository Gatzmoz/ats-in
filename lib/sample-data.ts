import { ResumeData } from "@/lib/type";

export const initialSampleData: ResumeData = {
  personalInfo: {
    fullName: "Alex Budi Pratama",
    jobTitle: "Senior Full Stack Software Engineer",
    email: "alex.pratama@email.com",
    phone: "+62 812 3456 7890",
    location: "Jakarta, Indonesia",
    website: "https://alexpratama.dev",
    linkedin: "https://linkedin.com/in/alexpratama",
    github: "https://github.com/alexpratama",
  },
  summary:
    "Result-driven Senior Software Engineer with over 5 years of experience building scalable web applications, RESTful APIs, and cloud services using Next.js, React, Node.js, and TypeScript. Proven track record of improving system performance by 40% and leading cross-functional teams to deliver high-impact products.",
  workExperience: [
    {
      id: "exp-1",
      company: "Tech Utama Indonesia",
      jobTitle: "Senior Software Engineer",
      location: "Jakarta, Indonesia",
      startDate: "2023-01",
      endDate: "",
      isCurrent: true,
      description:
        "- Architected and deployed microservices using Next.js and Node.js serving over 500,000 active monthly users.\n- Reduced page load latency by 45% through aggressive SSR caching, image optimization, and bundle splitting.\n- Mentored 4 junior engineers and established automated CI/CD pipelines reducing deployment times by 60%.",
    },
    {
      id: "exp-2",
      company: "Solusi Digital Asia",
      jobTitle: "Frontend Developer",
      location: "Bandung, Indonesia",
      startDate: "2020-06",
      endDate: "2022-12",
      isCurrent: false,
      description:
        "- Developed responsive single-page web applications utilizing React, Redux, and Tailwind CSS.\n- Integrated third-party payment gateways (Midtrans, Stripe) ensuring 99.9% transaction success rate.\n- Worked closely with UX designers to implement accessible (WCAG compliant) design systems.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Institut Teknologi Bandung",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      location: "Bandung, Indonesia",
      startDate: "2016-08",
      endDate: "2020-05",
      isCurrent: false,
      gpa: "3.85 / 4.00",
      description:
        "Graduated with High Distinction (Cum Laude). Active in Informatics Student Executive Board.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "ATS-In Resume Builder",
      role: "Lead Creator",
      techStack: "Next.js 16, React 19, TypeScript, Zustand, Tailwind CSS",
      link: "https://github.com/alexpratama/ats-in",
      startDate: "2024-01",
      endDate: "2024-03",
      description:
        "- Created an open-source, ATS-compliant CV generator with live PDF rendering and custom templates.\n- Reached 1,000+ GitHub stars and processed over 10,000 generated resumes.",
    },
    {
      id: "proj-2",
      title: "AI Document Analyzer",
      role: "Full Stack Engineer",
      techStack: "Python, FastAPI, OpenAI API, React, PostgreSQL",
      link: "https://devpost.com/software/ai-doc-analyzer",
      startDate: "2023-08",
      endDate: "2023-11",
      description:
        "- Built an AI-powered document parsing engine capable of extracting structured JSON data from PDF invoices with 98% accuracy.",
    },
  ],
  skills: [
    {
      id: "skill-1",
      categoryName: "Programming & Languages",
      skillsList: "TypeScript, JavaScript (ES6+), Python, HTML5, CSS3, SQL",
    },
    {
      id: "skill-2",
      categoryName: "Frameworks & Libraries",
      skillsList: "Next.js, React.js, Node.js, Express, Tailwind CSS, Zustand, Redux",
    },
    {
      id: "skill-3",
      categoryName: "Tools & Cloud",
      skillsList: "Git, Docker, AWS (S3, Lambda), Vercel, PostgreSQL, Jest, CI/CD",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      issueDate: "2023-05",
      expirationDate: "2026-05",
      credentialUrl: "https://aws.amazon.com/verification",
    },
    {
      id: "cert-2",
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Coursera / Meta",
      issueDate: "2022-04",
      credentialUrl: "https://coursera.org/verify/meta-frontend",
    },
  ],
  config: {
    templateId: "classic",
    fontFamily: "Helvetica",
    fontSize: "medium",
    accentColor: "#1e3a8a",
    lineSpacing: 1.2,
  },
};
