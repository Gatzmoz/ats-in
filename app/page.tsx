"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Forms from "@/components/forms";
import PDFPreview from "@/components/pdf-preview";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Edit3, Eye } from "lucide-react";

export default function Home() {
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans">
      {/* App Header Bar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {/* Desktop Split View (Resizable) */}
        <div className="hidden md:block h-full">
          <ResizablePanelGroup orientation="horizontal" className="h-full">
            <ResizablePanel defaultSize="50%" minSize="35%" maxSize="65%">
              <Forms />
            </ResizablePanel>
            <ResizableHandle
              withHandle={true}
              className="bg-slate-200 dark:bg-slate-800 hover:bg-blue-500 transition-colors"
            />
            <ResizablePanel defaultSize="50%" minSize="35%" maxSize="65%">
              <PDFPreview />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile View (Tabbed Switcher) */}
        <div className="block md:hidden h-full pb-12">
          {mobileTab === "edit" ? <Forms /> : <PDFPreview />}

          {/* Mobile Bottom Navigation Bar */}
          <div className="fixed bottom-0 left-0 right-0 h-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around z-50">
            <button
              onClick={() => setMobileTab("edit")}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                mobileTab === "edit"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Resume
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                mobileTab === "preview"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
