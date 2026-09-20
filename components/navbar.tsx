"use client";

import React, { useRef } from "react";
import { useResumeStore } from "@/lib/zustand";
import { Button } from "@/components/ui/button";
import {
  FileCheck2,
  FileJson,
  RotateCcw,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { ResumeData } from "@/lib/type";

export default function Navbar() {
  const data = useResumeStore((state) => state.data);
  const loadSampleData = useResumeStore((state) => state.loadSampleData);
  const clearData = useResumeStore((state) => state.clearData);
  const setFullData = useResumeStore((state) => state.setFullData);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `${
        data.personalInfo.fullName
          ? data.personalInfo.fullName.toLowerCase().replace(/\s+/g, "_")
          : "resume"
      }_data.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string) as ResumeData;
        if (parsed.personalInfo) {
          setFullData(parsed);
        } else {
          alert("Invalid JSON format for ATS CV data.");
        }
      } catch (err) {
        alert("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-lg shadow-sm">
          <FileCheck2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            ATS-IN <span className="text-blue-600 dark:text-blue-400">CV Maker</span>
          </h1>
          <p className="text-[11px] text-slate-500 font-medium leading-none">
            Build ATS-Friendly Resumes Effortlessly
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={loadSampleData}
          className="h-8 text-xs gap-1.5 border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Load Sample Data
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExportJSON}
          className="h-8 text-xs gap-1 text-slate-700 dark:text-slate-300"
          title="Export JSON"
        >
          <FileJson className="w-3.5 h-3.5" />
          Export
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="h-8 text-xs gap-1 text-slate-700 dark:text-slate-300"
          title="Import JSON"
        >
          <Upload className="w-3.5 h-3.5" />
          Import
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImportJSON}
          accept=".json"
          className="hidden"
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={clearData}
          className="h-8 text-xs gap-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
          title="Clear Form"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </Button>
      </div>
    </header>
  );
}
