import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeData,
  PersonalInfo,
  WorkExperience,
  Education,
  Project,
  SkillCategory,
  Certification,
  CVConfig,
} from "@/lib/type";
import { initialSampleData } from "@/lib/sample-data";

interface ResumeStore {
  data: ResumeData;

  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;

  // Work Experience
  addWorkExperience: (item?: Partial<WorkExperience>) => void;
  updateWorkExperience: (id: string, item: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;

  // Education
  addEducation: (item?: Partial<Education>) => void;
  updateEducation: (id: string, item: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Projects
  addProject: (item?: Partial<Project>) => void;
  updateProject: (id: string, item: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Skills
  addSkill: (item?: Partial<SkillCategory>) => void;
  updateSkill: (id: string, item: Partial<SkillCategory>) => void;
  removeSkill: (id: string) => void;

  // Certifications
  addCertification: (item?: Partial<Certification>) => void;
  updateCertification: (id: string, item: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Config
  updateConfig: (config: Partial<CVConfig>) => void;

  // Preset operations
  loadSampleData: () => void;
  clearData: () => void;
  setFullData: (data: ResumeData) => void;
}

const emptyData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  workExperience: [],
  education: [],
  projects: [],
  skills: [],
  certifications: [],
  config: {
    templateId: "classic",
    fontFamily: "Helvetica",
    fontSize: "medium",
    accentColor: "#1e3a8a",
    lineSpacing: 1.2,
  },
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: initialSampleData,

      updatePersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),

      updateSummary: (summary) =>
        set((state) => ({
          data: { ...state.data, summary },
        })),

      // Work Experience
      addWorkExperience: (item) =>
        set((state) => {
          const newItem: WorkExperience = {
            id: "exp-" + Date.now(),
            company: item?.company || "",
            jobTitle: item?.jobTitle || "",
            location: item?.location || "",
            startDate: item?.startDate || "",
            endDate: item?.endDate || "",
            isCurrent: item?.isCurrent || false,
            description: item?.description || "",
          };
          return {
            data: {
              ...state.data,
              workExperience: [...state.data.workExperience, newItem],
            },
          };
        }),

      updateWorkExperience: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.map((exp) =>
              exp.id === id ? { ...exp, ...item } : exp
            ),
          },
        })),

      removeWorkExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            workExperience: state.data.workExperience.filter(
              (exp) => exp.id !== id
            ),
          },
        })),

      // Education
      addEducation: (item) =>
        set((state) => {
          const newItem: Education = {
            id: "edu-" + Date.now(),
            school: item?.school || "",
            degree: item?.degree || "",
            fieldOfStudy: item?.fieldOfStudy || "",
            location: item?.location || "",
            startDate: item?.startDate || "",
            endDate: item?.endDate || "",
            isCurrent: item?.isCurrent || false,
            gpa: item?.gpa || "",
            description: item?.description || "",
          };
          return {
            data: {
              ...state.data,
              education: [...state.data.education, newItem],
            },
          };
        }),

      updateEducation: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((edu) =>
              edu.id === id ? { ...edu, ...item } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),

      // Projects
      addProject: (item) =>
        set((state) => {
          const newItem: Project = {
            id: "proj-" + Date.now(),
            title: item?.title || "",
            role: item?.role || "",
            techStack: item?.techStack || "",
            link: item?.link || "",
            startDate: item?.startDate || "",
            endDate: item?.endDate || "",
            description: item?.description || "",
          };
          return {
            data: {
              ...state.data,
              projects: [...state.data.projects, newItem],
            },
          };
        }),

      updateProject: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) =>
              p.id === id ? { ...p, ...item } : p
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((p) => p.id !== id),
          },
        })),

      // Skills
      addSkill: (item) =>
        set((state) => {
          const newItem: SkillCategory = {
            id: "skill-" + Date.now(),
            categoryName: item?.categoryName || "Technical Skills",
            skillsList: item?.skillsList || "",
          };
          return {
            data: {
              ...state.data,
              skills: [...state.data.skills, newItem],
            },
          };
        }),

      updateSkill: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((s) =>
              s.id === id ? { ...s, ...item } : s
            ),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s.id !== id),
          },
        })),

      // Certifications
      addCertification: (item) =>
        set((state) => {
          const newItem: Certification = {
            id: "cert-" + Date.now(),
            name: item?.name || "",
            issuer: item?.issuer || "",
            issueDate: item?.issueDate || "",
            expirationDate: item?.expirationDate || "",
            credentialUrl: item?.credentialUrl || "",
          };
          return {
            data: {
              ...state.data,
              certifications: [...state.data.certifications, newItem],
            },
          };
        }),

      updateCertification: (id, item) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((c) =>
              c.id === id ? { ...c, ...item } : c
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter(
              (c) => c.id !== id
            ),
          },
        })),

      // Config
      updateConfig: (config) =>
        set((state) => ({
          data: {
            ...state.data,
            config: { ...state.data.config, ...config },
          },
        })),

      // Presets
      loadSampleData: () => set({ data: initialSampleData }),
      clearData: () => set({ data: emptyData }),
      setFullData: (data) => set({ data }),
    }),
    {
      name: "ats-in-resume-store",
    }
  )
);

// Backward compatibility helper for useData if referenced elsewhere
export const useData = () => {
  const data = useResumeStore((s) => s.data);
  const setFullData = useResumeStore((s) => s.setFullData);
  return { User: data, updateUser: setFullData };
};
