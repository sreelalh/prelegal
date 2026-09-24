"use client";

import React, { useState } from "react";
import { DEFAULT_FORM_DATA, MndaFormData } from "@/lib/mnda-generator";
import MndaForm from "@/components/MndaForm";
import MndaPreview from "@/components/MndaPreview";
import { FileText, Scale } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState<MndaFormData>(DEFAULT_FORM_DATA);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white">
                  Prelegal
                </span>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-400">
                  Mutual NDA Creator
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Industry-standard legal agreement generator powered by Common Paper
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <FileText className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Common Paper MNDA v1.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left: Input Form */}
          <div className="lg:col-span-5 print:hidden">
            <MndaForm formData={formData} onChange={setFormData} />
          </div>

          {/* Right: Live Preview & Document Actions */}
          <div className="lg:col-span-7 lg:sticky lg:top-20 h-auto lg:h-[calc(100vh-6.5rem)]">
            <MndaPreview formData={formData} />
          </div>
        </div>
      </main>
    </div>
  );
}
