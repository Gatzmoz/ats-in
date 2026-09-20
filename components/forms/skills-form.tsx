"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import FormInput from "@/components/forms/form-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Plus, Trash2 } from "lucide-react";

export default function SkillsForm() {
  const skills = useResumeStore((state) => state.data.skills);
  const addSkill = useResumeStore((state) => state.addSkill);
  const updateSkill = useResumeStore((state) => state.updateSkill);
  const removeSkill = useResumeStore((state) => state.removeSkill);

  return (
    <div className="space-y-4">
      <div className="border-b pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-600" />
            Skills & Competencies
          </h2>
          <p className="text-xs text-slate-500">
            Categorize your technical skills, tools, languages, or domain expertise.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => addSkill()}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {skills.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed rounded-lg text-slate-400">
          <p className="text-sm">No skill categories added yet.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addSkill()}
            className="mt-3 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Skill Category
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <Card key={skill.id} className="p-4 relative border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Skill Group #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skill.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600"
                  title="Remove Skill Category"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-1">
                  <FormInput
                    label="Category Name"
                    value={skill.categoryName || ""}
                    onChange={(e) =>
                      updateSkill(skill.id, { categoryName: e.target.value })
                    }
                    placeholder="e.g. Programming Languages"
                  />
                </div>

                <div className="md:col-span-2">
                  <FormInput
                    label="Skills (Comma-separated)"
                    value={skill.skillsList || ""}
                    onChange={(e) =>
                      updateSkill(skill.id, { skillsList: e.target.value })
                    }
                    placeholder="e.g. TypeScript, React, Node.js, Python, SQL"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
