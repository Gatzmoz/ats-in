"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useResumeStore } from "@/lib/zustand";
import { PDFDocument } from "@/components/pdf-template";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2, RefreshCw } from "lucide-react";

// Dynamic import for PDFViewer and PDFDownloadLink to bypass Next.js SSR
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted-foreground bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-sm font-medium">Preparing PDF Renderer...</p>
      </div>
    ),
  }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function PDFPreview() {
  const data = useResumeStore((state) => state.data);
  const [isClient, setIsClient] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Force rerender preview if needed
  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const fileName = `${
    data.personalInfo.fullName
      ? data.personalInfo.fullName.toLowerCase().replace(/\s+/g, "_")
      : "resume"
  }_ats_cv.pdf`;

  return (
    <div className="flex flex-col h-full bg-slate-100 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800">
      {/* PDF Action Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Live ATS PDF Preview</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            title="Refresh Preview"
            className="h-8 px-2.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-400"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            Refresh
          </Button>

          {isClient && (
            <PDFDownloadLink
              document={<PDFDocument data={data} />}
              fileName={fileName}
            >
              {({ loading }: { loading: boolean }) => (
                <Button
                  size="sm"
                  disabled={loading}
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm flex items-center gap-1.5"
                >
                  {loading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5" />
                  )}
                  {loading ? "Generating..." : "Download PDF"}
                </Button>
              )}
            </PDFDownloadLink>
          )}
        </div>
      </div>

      {/* PDF Canvas Container */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-slate-200 dark:bg-slate-900 p-2">
        {isClient ? (
          <PDFViewer
            key={key}
            className="w-full h-full rounded shadow-sm border border-slate-300 dark:border-slate-700"
            showToolbar={true}
          >
            <PDFDocument data={data} />
          </PDFViewer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p className="text-xs">Loading PDF Canvas...</p>
          </div>
        )}
      </div>
    </div>
  );
}
