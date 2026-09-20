"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import FormInput from "@/components/forms/form-input";
import { User } from "lucide-react";

export default function PersonalInfoForm() {
  const personalInfo = useResumeStore((state) => state.data.personalInfo);
  const updatePersonalInfo = useResumeStore((state) => state.updatePersonalInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Personal Information
        </h2>
        <p className="text-xs text-slate-500">
          Enter your contact details. ATS parsers read this section to match your candidate profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormInput
          label="Full Name"
          name="fullName"
          value={personalInfo.fullName || ""}
          onChange={handleChange}
          placeholder="e.g. Alex Budi Pratama"
        />

        <FormInput
          label="Target Job Title"
          name="jobTitle"
          value={personalInfo.jobTitle || ""}
          onChange={handleChange}
          placeholder="e.g. Senior Software Engineer"
        />

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={personalInfo.email || ""}
          onChange={handleChange}
          placeholder="e.g. alex@example.com"
        />

        <FormInput
          label="Phone Number"
          type="tel"
          name="phone"
          value={personalInfo.phone || ""}
          onChange={handleChange}
          placeholder="e.g. +62 812 3456 7890"
        />

        <FormInput
          label="Location (City, Country)"
          name="location"
          value={personalInfo.location || ""}
          onChange={handleChange}
          placeholder="e.g. Jakarta, Indonesia"
        />

        <FormInput
          label="Portfolio / Personal Website"
          type="url"
          name="website"
          value={personalInfo.website || ""}
          onChange={handleChange}
          placeholder="e.g. https://alexpratama.dev"
        />

        <FormInput
          label="LinkedIn Profile URL"
          type="url"
          name="linkedin"
          value={personalInfo.linkedin || ""}
          onChange={handleChange}
          placeholder="e.g. https://linkedin.com/in/alexpratama"
        />

        <FormInput
          label="GitHub Profile URL"
          type="url"
          name="github"
          value={personalInfo.github || ""}
          onChange={handleChange}
          placeholder="e.g. https://github.com/alexpratama"
        />
      </div>
    </div>
  );
}
