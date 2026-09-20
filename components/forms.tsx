"use client";

import React, { useState } from "react";
import PersonalInfoForm from "@/components/forms/personal-info-form";
import SummaryForm from "@/components/forms/summary-form";
import ExperienceForm from "@/components/forms/experience-form";
import EducationForm from "@/components/forms/education-form";
import ProjectsForm from "@/components/forms/projects-form";
import SkillsForm from "@/components/forms/skills-form";
import CertificationsForm from "@/components/forms/certifications-form";
import ConfigForm from "@/components/forms/config-form";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Wrench,
  Award,
  Palette,
} from "lucide-react";

const tabs = [
  { id: "personal", label: "Personal", icon: User },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "style", label: "Design", icon: Palette },
] as const;

export default function Forms() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]["id"]>("personal");

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 overflow-hidden">
      {/* Tab Header Navigation */}
      <div className="flex items-center gap-1 p-2 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                isActive
                  ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-800"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 dark:hover:bg-slate-900/60"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-600" : ""}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {activeTab === "personal" && <PersonalInfoForm />}
        {activeTab === "summary" && <SummaryForm />}
        {activeTab === "experience" && <ExperienceForm />}
        {activeTab === "education" && <EducationForm />}
        {activeTab === "projects" && <ProjectsForm />}
        {activeTab === "skills" && <SkillsForm />}
        {activeTab === "certifications" && <CertificationsForm />}
        {activeTab === "style" && <ConfigForm />}
      </div>
    </div>
  );
}
