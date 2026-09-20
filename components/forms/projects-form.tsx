"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import FormInput from "@/components/forms/form-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Code2, Plus, Trash2 } from "lucide-react";

export default function ProjectsForm() {
  const projects = useResumeStore((state) => state.data.projects);
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);
  const removeProject = useResumeStore((state) => state.removeProject);

  return (
    <div className="space-y-4">
      <div className="border-b pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            Key Projects
          </h2>
          <p className="text-xs text-slate-500">
            Showcase technical or portfolio projects that demonstrate your practical skills.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => addProject()}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed rounded-lg text-slate-400">
          <p className="text-sm">No projects added yet.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addProject()}
            className="mt-3 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <Card key={proj.id} className="p-4 relative border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3 border-b pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Project #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(proj.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <FormInput
                  label="Project Title"
                  value={proj.title || ""}
                  onChange={(e) =>
                    updateProject(proj.id, { title: e.target.value })
                  }
                  placeholder="e.g. ATS Resume Generator"
                />

                <FormInput
                  label="Role"
                  value={proj.role || ""}
                  onChange={(e) =>
                    updateProject(proj.id, { role: e.target.value })
                  }
                  placeholder="e.g. Lead Developer / Creator"
                />

                <FormInput
                  label="Technologies Used"
                  value={proj.techStack || ""}
                  onChange={(e) =>
                    updateProject(proj.id, { techStack: e.target.value })
                  }
                  placeholder="e.g. Next.js, React, TypeScript, Tailwind"
                />

                <FormInput
                  label="Project URL / Repository Link"
                  type="url"
                  value={proj.link || ""}
                  onChange={(e) =>
                    updateProject(proj.id, { link: e.target.value })
                  }
                  placeholder="e.g. https://github.com/user/project"
                />
              </div>

              <Field>
                <FieldLabel>Project Highlights & Results</FieldLabel>
                <Textarea
                  value={proj.description || ""}
                  onChange={(e) =>
                    updateProject(proj.id, { description: e.target.value })
                  }
                  placeholder="- Built an open-source tool used by 10,000+ users...&#10;- Implemented real-time PDF engine with 99% accuracy..."
                  rows={3}
                  className="resize-y text-xs font-mono"
                />
              </Field>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
