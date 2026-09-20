"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import FormInput from "@/components/forms/form-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

export default function EducationForm() {
  const education = useResumeStore((state) => state.data.education);
  const addEducation = useResumeStore((state) => state.addEducation);
  const updateEducation = useResumeStore((state) => state.updateEducation);
  const removeEducation = useResumeStore((state) => state.removeEducation);

  return (
    <div className="space-y-4">
      <div className="border-b pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Education
          </h2>
          <p className="text-xs text-slate-500">
            Add your academic background, degrees, and qualifications.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => addEducation()}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs"
        >
          <Plus className="w-4 h-4" /> Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed rounded-lg text-slate-400">
          <p className="text-sm">No education entries added yet.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addEducation()}
            className="mt-3 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={edu.id} className="p-4 relative border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Education #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600"
                  title="Remove Education"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <FormInput
                  label="School / University"
                  value={edu.school || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { school: e.target.value })
                  }
                  placeholder="e.g. Institut Teknologi Bandung"
                />

                <FormInput
                  label="Degree"
                  value={edu.degree || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                  placeholder="e.g. Bachelor of Science"
                />

                <FormInput
                  label="Field of Study / Major"
                  value={edu.fieldOfStudy || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { fieldOfStudy: e.target.value })
                  }
                  placeholder="e.g. Computer Science"
                />

                <FormInput
                  label="Location"
                  value={edu.location || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { location: e.target.value })
                  }
                  placeholder="e.g. Bandung, Indonesia"
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormInput
                    label="Start Date"
                    type="month"
                    value={edu.startDate || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, { startDate: e.target.value })
                    }
                  />

                  <FormInput
                    label="End Date"
                    type="month"
                    disabled={edu.isCurrent}
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      updateEducation(edu.id, { endDate: e.target.value })
                    }
                  />
                </div>

                <FormInput
                  label="GPA / Score (Optional)"
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { gpa: e.target.value })
                  }
                  placeholder="e.g. 3.85 / 4.00"
                />
              </div>

              <Field>
                <FieldLabel>Honors, Activities & Notes (Optional)</FieldLabel>
                <Textarea
                  value={edu.description || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { description: e.target.value })
                  }
                  placeholder="e.g. Graduated with Cum Laude honours. Active in Student Association."
                  rows={2}
                  className="resize-y text-xs"
                />
              </Field>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
