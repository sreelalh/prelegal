"use client";

import React from "react";
import {
  MndaFormData,
  PURPOSE_PRESETS,
  SAMPLE_FORM_DATA,
  DEFAULT_FORM_DATA,
} from "@/lib/mnda-generator";
import {
  Building2,
  Calendar,
  FileCheck2,
  Gavel,
  RotateCcw,
  Sparkles,
  Users,
} from "lucide-react";

interface MndaFormProps {
  formData: MndaFormData;
  onChange: (data: MndaFormData) => void;
}

export default function MndaForm({ formData, onChange }: MndaFormProps) {
  const updateField = <K extends keyof MndaFormData>(
    field: K,
    value: MndaFormData[K]
  ) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const updateParty = (
    party: "party1" | "party2",
    field: keyof MndaFormData["party1"],
    value: string
  ) => {
    onChange({
      ...formData,
      [party]: {
        ...formData[party],
        [field]: value,
      },
    });
  };

  const handleLoadSample = () => {
    onChange({ ...SAMPLE_FORM_DATA });
  };

  const handleReset = () => {
    onChange({ ...DEFAULT_FORM_DATA });
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900/60">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Agreement Details
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Fill in the information below to compile your Mutual NDA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-950/70 cursor-pointer transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            Fill Sample Data
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100 cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Section 1: Parties */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Parties to Agreement
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Party 1 */}
          <div className="space-y-3.5 rounded-lg border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Party 1 (You / Your Entity)
              </span>
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Company / Legal Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Acme Technologies Inc."
                value={formData.party1.company}
                onChange={(e) => updateParty("party1", "company", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Signatory Print Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={formData.party1.name}
                onChange={(e) => updateParty("party1", "name", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Title / Role
              </label>
              <input
                type="text"
                placeholder="e.g. Chief Executive Officer"
                value={formData.party1.title}
                onChange={(e) => updateParty("party1", "title", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Notice Address or Email
              </label>
              <input
                type="text"
                placeholder="e.g. legal@acme.com or 123 Main St, Austin, TX"
                value={formData.party1.emailOrAddress}
                onChange={(e) => updateParty("party1", "emailOrAddress", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Signing Date
              </label>
              <input
                type="date"
                value={formData.party1.date}
                onChange={(e) => updateParty("party1", "date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Party 2 */}
          <div className="space-y-3.5 rounded-lg border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Party 2 (Counterparty)
              </span>
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Company / Legal Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Counterparty Labs LLC"
                value={formData.party2.company}
                onChange={(e) => updateParty("party2", "company", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Signatory Print Name *
              </label>
              <input
                type="text"
                placeholder="e.g. John Smith"
                value={formData.party2.name}
                onChange={(e) => updateParty("party2", "name", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Title / Role
              </label>
              <input
                type="text"
                placeholder="e.g. Managing Partner"
                value={formData.party2.title}
                onChange={(e) => updateParty("party2", "title", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Notice Address or Email
              </label>
              <input
                type="text"
                placeholder="e.g. notices@counterparty.com"
                value={formData.party2.emailOrAddress}
                onChange={(e) => updateParty("party2", "emailOrAddress", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Signing Date
              </label>
              <input
                type="date"
                value={formData.party2.date}
                onChange={(e) => updateParty("party2", "date", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Purpose & Effective Date */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <FileCheck2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Purpose & Effective Date
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Purpose of Confidential Disclosure *
              </label>
              <span className="text-[11px] text-slate-400">
                Defines permitted use of information
              </span>
            </div>
            <textarea
              rows={2}
              value={formData.purpose}
              onChange={(e) => updateField("purpose", e.target.value)}
              placeholder="e.g. Evaluating whether to enter into a business relationship..."
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            {/* Purpose presets */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="self-center text-[11px] text-slate-400">Presets:</span>
              {PURPOSE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateField("purpose", preset)}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-indigo-800 dark:hover:text-indigo-300 cursor-pointer transition-colors"
                >
                  Preset {idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                Effective Date *
              </label>
              <div className="relative mt-1">
                <input
                  type="date"
                  value={formData.effectiveDate}
                  onChange={(e) => updateField("effectiveDate", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Terms & Durations */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <Calendar className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Terms & Duration
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* MNDA Term */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              MNDA Term (Agreement Validity)
            </span>
            <div className="space-y-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={formData.mndaTermType === "fixed"}
                  onChange={() => updateField("mndaTermType", "fixed")}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="space-y-1">
                  <span>Expires after a fixed duration</span>
                  {formData.mndaTermType === "fixed" && (
                    <input
                      type="text"
                      placeholder="e.g. 1 year, 2 years, 6 months"
                      value={formData.mndaTermDuration}
                      onChange={(e) => updateField("mndaTermDuration", e.target.value)}
                      className="block w-full rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  )}
                </div>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="mndaTermType"
                  checked={formData.mndaTermType === "until_terminated"}
                  onChange={() => updateField("mndaTermType", "until_terminated")}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>Continues until terminated by either party</span>
              </label>
            </div>
          </div>

          {/* Confidentiality Term */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Term of Confidentiality (Protection Period)
            </span>
            <div className="space-y-2">
              <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={formData.confidentialityTermType === "fixed"}
                  onChange={() => updateField("confidentialityTermType", "fixed")}
                  className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="space-y-1">
                  <span>Fixed duration (trade secrets protected indefinitely)</span>
                  {formData.confidentialityTermType === "fixed" && (
                    <input
                      type="text"
                      placeholder="e.g. 1 year, 3 years, 5 years"
                      value={formData.confidentialityTermDuration}
                      onChange={(e) =>
                        updateField("confidentialityTermDuration", e.target.value)
                      }
                      className="block w-full rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                  )}
                </div>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="confidentialityTermType"
                  checked={formData.confidentialityTermType === "in_perpetuity"}
                  onChange={() =>
                    updateField("confidentialityTermType", "in_perpetuity")
                  }
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span>In perpetuity (protect indefinitely)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Governing Law & Jurisdiction */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <Gavel className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Governing Law & Legal Venue
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Governing Law (State / Jurisdiction) *
            </label>
            <input
              type="text"
              placeholder="e.g. Delaware, California, New York"
              value={formData.governingLaw}
              onChange={(e) => updateField("governingLaw", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Exclusive Jurisdiction Courts *
            </label>
            <input
              type="text"
              placeholder="e.g. courts located in New Castle County, DE"
              value={formData.jurisdiction}
              onChange={(e) => updateField("jurisdiction", e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
            Special MNDA Modifications (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. None (or state specific amendments to Standard Terms)"
            value={formData.modifications}
            onChange={(e) => updateField("modifications", e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>
      </div>
    </div>
  );
}
