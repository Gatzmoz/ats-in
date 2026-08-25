"use client";
import FormInput from "@/components/forms/form-input";
import ExperienceForm from "@/components/forms/experience-form";
import { Button } from "@/components/ui/button";

export default function Forms() {
  return (
    <div className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl font-bold text-blue-500 mb-0">CV ATS MAKER</h1>
      <Button variant="secondary" className="bg-green-500 text-white w-fit">
        Save XML
      </Button>
      <hr className="mb-2" />
      <form>
        <h2 className="text-xl font-bold text-blue-500 mb-2">
          Personal Information
        </h2>
        <div className="personal-info mb-2">
          <FormInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormInput
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
          />
          <FormInput
            label="Address"
            type="text"
            placeholder="Enter your address (City, Province)"
          />
          <FormInput
            label="LinkedIn"
            type="url"
            placeholder="Enter your LinkedIn profile URL"
          />
          <FormInput
            label="GitHub"
            type="url"
            placeholder="Enter your GitHub profile URL"
          />
        </div>
        <ExperienceForm label="Work Experiences" />
        <ExperienceForm label="Educations" />
        <ExperienceForm label="Projects" />
        <ExperienceForm label="Certifications" />
      </form>
    </div>
  );
}
