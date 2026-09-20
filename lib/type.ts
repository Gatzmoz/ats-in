export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string; // Multi-line bullet points
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  role?: string;
  techStack?: string;
  link?: string;
  startDate?: string;
  endDate?: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string; // e.g., "Programming Languages", "Frameworks & Tools"
  skillsList: string; // Comma separated or multi-line
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialUrl?: string;
}

export interface CVConfig {
  templateId: "classic" | "modern" | "executive" | "minimal";
  fontFamily: "Helvetica" | "Times-Roman" | "Courier";
  fontSize: "small" | "medium" | "large";
  accentColor: string;
  lineSpacing: number;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  config: CVConfig;
}
