"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Lightbulb } from "lucide-react";

export default function SummaryForm() {
  const summary = useResumeStore((state) => state.data.summary);
  const updateSummary = useResumeStore((state) => state.updateSummary);

  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Professional Summary
        </h2>
        <p className="text-xs text-slate-500">
          A concise 3-4 sentence elevator pitch highlighting your key skills, years of experience, and top achievements.
        </p>
      </div>

      <Field>
        <FieldLabel>Summary Statement</FieldLabel>
        <Textarea
          value={summary || ""}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="e.g. Result-driven Senior Software Engineer with over 5 years of experience building scalable web applications..."
          rows={5}
          className="resize-y text-sm"
        />
      </Field>

      <div className="flex items-start gap-2.5 p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg text-xs text-blue-900 dark:text-blue-300">
        <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-0.5">ATS Tip:</p>
          <p>
            Include relevant job keywords (e.g. &quot;TypeScript&quot;, &quot;Project Management&quot;, &quot;Agile&quot;) directly from the target job description to boost your ATS match score.
          </p>
        </div>
      </div>
    </div>
  );
}
