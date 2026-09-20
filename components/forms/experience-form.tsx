"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import FormInput from "@/components/forms/form-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, Trash2 } from "lucide-react";

export default function ExperienceForm() {
  const workExperience = useResumeStore((state) => state.data.workExperience);
  const addWorkExperience = useResumeStore((state) => state.addWorkExperience);
  const updateWorkExperience = useResumeStore((state) => state.updateWorkExperience);
  const removeWorkExperience = useResumeStore((state) => state.removeWorkExperience);

  return (
    <div className="space-y-4">
      <div className="border-b pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Work Experience
          </h2>
          <p className="text-xs text-slate-500">
            List your relevant work history starting with your most recent position.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => addWorkExperience()}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </Button>
      </div>

      {workExperience.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed rounded-lg text-slate-400">
          <p className="text-sm">No work experience added yet.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addWorkExperience()}
            className="mt-3 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Work Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {workExperience.map((exp, index) => (
            <Card key={exp.id} className="p-4 relative border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Position #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeWorkExperience(exp.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600"
                  title="Remove Position"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <FormInput
                  label="Job Title"
                  value={exp.jobTitle || ""}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, { jobTitle: e.target.value })
                  }
                  placeholder="e.g. Senior Software Engineer"
                />

                <FormInput
                  label="Company Name"
                  value={exp.company || ""}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, { company: e.target.value })
                  }
                  placeholder="e.g. Tech Utama Indonesia"
                />

                <FormInput
                  label="Location"
                  value={exp.location || ""}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, { location: e.target.value })
                  }
                  placeholder="e.g. Jakarta, Indonesia"
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormInput
                    label="Start Date"
                    type="month"
                    value={exp.startDate || ""}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, { startDate: e.target.value })
                    }
                  />

                  <FormInput
                    label="End Date"
                    type="month"
                    disabled={exp.isCurrent}
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, { endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id={`current-job-${exp.id}`}
                  checked={exp.isCurrent || false}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, {
                      isCurrent: e.target.checked,
                      endDate: e.target.checked ? "" : exp.endDate,
                    })
                  }
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <label
                  htmlFor={`current-job-${exp.id}`}
                  className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  I currently work here
                </label>
              </div>

              <Field>
                <FieldLabel>Key Accomplishments & Responsibilities</FieldLabel>
                <Textarea
                  value={exp.description || ""}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, { description: e.target.value })
                  }
                  placeholder="- Architected microservices using Next.js serving 500k monthly users...&#10;- Reduced latency by 45% through SSR caching..."
                  rows={4}
                  className="resize-y text-xs font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Start each line with a bullet point or hyphen (<code>-</code>) for best ATS parsing. Use action verbs and quantifiable metrics.
                </p>
              </Field>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
