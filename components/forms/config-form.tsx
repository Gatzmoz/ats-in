"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import { Field, FieldLabel } from "@/components/ui/field";
import { Palette, Type, Layout, SlidersHorizontal } from "lucide-react";

const templateOptions = [
  { id: "classic", name: "Classic ATS", desc: "Clean single-column layout with underline headers" },
  { id: "modern", name: "Modern Professional", desc: "Sleek headers with colored accent title" },
  { id: "executive", name: "Executive Serif", desc: "Centered header with elegant typography" },
  { id: "minimal", name: "Minimalist", desc: "Subtle layout focused purely on content density" },
] as const;

const fontOptions = [
  { id: "Helvetica", name: "Helvetica (Standard Sans-Serif)" },
  { id: "Times-Roman", name: "Times-Roman (Classic Serif)" },
  { id: "Courier", name: "Courier (Monospace Technical)" },
] as const;

const fontSizeOptions = [
  { id: "small", name: "Small (Compact 1-Page)" },
  { id: "medium", name: "Medium (Recommended)" },
  { id: "large", name: "Large (Readable)" },
] as const;

const accentColors = [
  { hex: "#1e3a8a", name: "Navy Blue" },
  { hex: "#0f766e", name: "Teal" },
  { hex: "#4338ca", name: "Indigo" },
  { hex: "#374151", name: "Charcoal" },
  { hex: "#b91c1c", name: "Burgundy" },
  { hex: "#047857", name: "Forest Green" },
];

export default function ConfigForm() {
  const config = useResumeStore((state) => state.data.config);
  const updateConfig = useResumeStore((state) => state.updateConfig);

  return (
    <div className="space-y-5">
      <div className="border-b pb-2">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          Template & Styling Settings
        </h2>
        <p className="text-xs text-slate-500">
          Customize typography, accent colors, and layout structure while preserving ATS compliance.
        </p>
      </div>

      {/* Template Layout Picker */}
      <Field>
        <FieldLabel className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
          <Layout className="w-4 h-4 text-blue-600" />
          Template Style
        </FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {templateOptions.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => updateConfig({ templateId: tmpl.id })}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                config.templateId === tmpl.id
                  ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-600/20"
                  : "border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{tmpl.name}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{tmpl.desc}</p>
            </div>
          ))}
        </div>
      </Field>

      {/* Font Family & Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field>
          <FieldLabel className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
            <Type className="w-4 h-4 text-blue-600" />
            Font Family
          </FieldLabel>
          <select
            value={config.fontFamily || "Helvetica"}
            onChange={(e) =>
              updateConfig({
                fontFamily: e.target.value as "Helvetica" | "Times-Roman" | "Courier",
              })
            }
            className="w-full mt-1 p-2 border rounded-md text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
          >
            {fontOptions.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <FieldLabel className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            Font Size Mode
          </FieldLabel>
          <select
            value={config.fontSize || "medium"}
            onChange={(e) =>
              updateConfig({
                fontSize: e.target.value as "small" | "medium" | "large",
              })
            }
            className="w-full mt-1 p-2 border rounded-md text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
          >
            {fontSizeOptions.map((fs) => (
              <option key={fs.id} value={fs.id}>
                {fs.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Accent Color Palette */}
      <Field>
        <FieldLabel className="font-semibold text-slate-800 dark:text-slate-200">
          Accent Theme Color
        </FieldLabel>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          {accentColors.map((color) => (
            <button
              key={color.hex}
              type="button"
              onClick={() => updateConfig({ accentColor: color.hex })}
              className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center ${
                config.accentColor === color.hex
                  ? "scale-110 ring-2 ring-offset-2 ring-blue-600"
                  : "hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          <input
            type="color"
            value={config.accentColor || "#1e3a8a"}
            onChange={(e) => updateConfig({ accentColor: e.target.value })}
            className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent p-0"
            title="Custom Color"
          />
        </div>
      </Field>

      {/* Line Spacing */}
      <Field>
        <FieldLabel className="font-semibold text-slate-800 dark:text-slate-200">
          Line Spacing: <span className="text-blue-600">{config.lineSpacing || 1.2}</span>
        </FieldLabel>
        <input
          type="range"
          min="1.0"
          max="1.5"
          step="0.05"
          value={config.lineSpacing || 1.2}
          onChange={(e) =>
            updateConfig({ lineSpacing: parseFloat(e.target.value) })
          }
          className="w-full accent-blue-600 cursor-pointer mt-1"
        />
      </Field>
    </div>
  );
}
