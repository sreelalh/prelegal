"use client";

import React, { useState } from "react";
import {
  MndaFormData,
  generateCoverPageMarkdown,
  generateStandardTermsMarkdown,
  generateFullMndaMarkdown,
  generatePlainText,
} from "@/lib/mnda-generator";
import {
  Check,
  Copy,
  Download,
  Eye,
  FileCode,
  FileText,
  Printer,
  ShieldCheck,
} from "lucide-react";

interface MndaPreviewProps {
  formData: MndaFormData;
}

export default function MndaPreview({ formData }: MndaPreviewProps) {
  const [activeTab, setActiveTab] = useState<"full" | "cover" | "terms">("full");
  const [viewMode, setViewMode] = useState<"formatted" | "raw">("formatted");
  const [copied, setCopied] = useState(false);

  const coverPageMd = generateCoverPageMarkdown(formData);
  const standardTermsMd = generateStandardTermsMarkdown(formData);
  const fullAgreementMd = generateFullMndaMarkdown(formData);
  const plainText = generatePlainText(formData);

  const getCurrentMarkdown = () => {
    switch (activeTab) {
      case "cover":
        return coverPageMd;
      case "terms":
        return standardTermsMd;
      case "full":
      default:
        return fullAgreementMd;
    }
  };

  const handleDownload = (format: "md" | "txt") => {
    const content = format === "md" ? getCurrentMarkdown() : plainText;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const p1 = (formData.party1.company || "Party1").replace(/[^a-zA-Z0-9]/g, "_");
    const p2 = (formData.party2.company || "Party2").replace(/[^a-zA-Z0-9]/g, "_");
    const date = formData.effectiveDate || new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `Mutual_NDA_${p1}_${p2}_${date}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCurrentMarkdown());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const p1 = formData.party1;
  const p2 = formData.party2;

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      {/* Action / Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-900/60 print:hidden">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-950">
          <button
            type="button"
            onClick={() => setActiveTab("full")}
            className={`rounded-md px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
              activeTab === "full"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Full Agreement
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cover")}
            className={`rounded-md px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
              activeTab === "cover"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Cover Page
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={`rounded-md px-3 py-1 text-xs font-medium cursor-pointer transition-colors ${
              activeTab === "terms"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Standard Terms
          </button>
        </div>

        {/* View Mode & Export Actions */}
        <div className="flex items-center gap-2">
          {/* Formatted vs Raw Toggle */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5 dark:border-slate-800 dark:bg-slate-950">
            <button
              type="button"
              onClick={() => setViewMode("formatted")}
              title="Formatted Document View"
              className={`rounded-md p-1.5 cursor-pointer transition-colors ${
                viewMode === "formatted"
                  ? "bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("raw")}
              title="Raw Markdown Source"
              className={`rounded-md p-1.5 cursor-pointer transition-colors ${
                viewMode === "raw"
                  ? "bg-slate-100 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              <FileCode className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span className="text-green-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={handlePrint}
            title="Print or Save as PDF"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 cursor-pointer transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print / PDF</span>
          </button>

          {/* Download Dropdown / Buttons */}
          <button
            type="button"
            onClick={() => handleDownload("md")}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-indigo-700 cursor-pointer transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download .md</span>
          </button>

          <button
            type="button"
            onClick={() => handleDownload("txt")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900 cursor-pointer transition-colors"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>.txt</span>
          </button>
        </div>
      </div>

      {/* Document Content View */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/40 dark:bg-slate-900/30">
        {viewMode === "raw" ? (
          <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 text-xs font-mono text-slate-200 overflow-x-auto dark:border-slate-800">
            <pre className="whitespace-pre-wrap">{getCurrentMarkdown()}</pre>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl rounded-xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-sm text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 print:border-none print:shadow-none print:p-0">
            {/* Header Badge */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Common Paper MNDA v1.0
                </span>
                <span className="text-xs text-slate-400">CC BY 4.0</span>
              </div>
              <span className="text-xs text-slate-500">
                Effective: {formData.effectiveDate || "Pending Date"}
              </span>
            </div>

            {/* Document Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Mutual Non-Disclosure Agreement
              </h1>
              <p className="mt-1 text-xs text-slate-500 uppercase tracking-widest font-mono">
                Standard Cover Page & Reference Terms
              </p>
            </div>

            {/* Cover Page Section */}
            {(activeTab === "full" || activeTab === "cover") && (
              <div className="space-y-6">
                {/* Intro notice */}
                <div className="rounded-lg bg-slate-50 p-4 text-xs leading-relaxed text-slate-600 border border-slate-100 dark:bg-slate-900/60 dark:text-slate-300 dark:border-slate-800/80">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    USING THIS MUTUAL NON-DISCLOSURE AGREEMENT:
                  </span>{" "}
                  This Mutual Non-Disclosure Agreement (the “MNDA”) consists of:
                  (1) this Cover Page and (2) the Common Paper Mutual NDA Standard
                  Terms Version 1.0 (“Standard Terms”) identical to those posted at{" "}
                  <a
                    href="https://commonpaper.com/standards/mutual-nda/1.0"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 underline dark:text-indigo-400"
                  >
                    commonpaper.com/standards/mutual-nda/1.0
                  </a>
                  . Any modifications of the Standard Terms should be made on this
                  Cover Page, which will control over conflicts with the Standard
                  Terms.
                </div>

                {/* Purpose */}
                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Purpose
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">
                    How Confidential Information may be used
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 bg-indigo-50/40 p-2.5 rounded-md border border-indigo-100/60 dark:bg-indigo-950/20 dark:border-indigo-900/30">
                    {formData.purpose || "—"}
                  </p>
                </div>

                {/* Effective Date */}
                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Effective Date
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                    {formData.effectiveDate || "—"}
                  </p>
                </div>

                {/* MNDA Term */}
                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    MNDA Term
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">
                    The length of this MNDA
                  </p>
                  <div className="space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-sm border flex items-center justify-center text-xs font-bold ${
                          formData.mndaTermType === "fixed"
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {formData.mndaTermType === "fixed" ? "✓" : ""}
                      </span>
                      <span>
                        Expires{" "}
                        <strong className="font-semibold text-indigo-700 dark:text-indigo-400">
                          {formData.mndaTermDuration || "1 year"}
                        </strong>{" "}
                        from Effective Date.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-sm border flex items-center justify-center text-xs font-bold ${
                          formData.mndaTermType === "until_terminated"
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {formData.mndaTermType === "until_terminated" ? "✓" : ""}
                      </span>
                      <span>
                        Continues until terminated in accordance with the terms of
                        the MNDA.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Term of Confidentiality */}
                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Term of Confidentiality
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-1">
                    How long Confidential Information is protected
                  </p>
                  <div className="space-y-1.5 text-sm text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-sm border flex items-center justify-center text-xs font-bold ${
                          formData.confidentialityTermType === "fixed"
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {formData.confidentialityTermType === "fixed" ? "✓" : ""}
                      </span>
                      <span>
                        <strong className="font-semibold text-indigo-700 dark:text-indigo-400">
                          {formData.confidentialityTermDuration || "1 year"}
                        </strong>{" "}
                        from Effective Date, but in the case of trade secrets until
                        Confidential Information is no longer considered a trade
                        secret under applicable laws.
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-4 w-4 rounded-sm border flex items-center justify-center text-xs font-bold ${
                          formData.confidentialityTermType === "in_perpetuity"
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-slate-300 dark:border-slate-700"
                        }`}
                      >
                        {formData.confidentialityTermType === "in_perpetuity"
                          ? "✓"
                          : ""}
                      </span>
                      <span>In perpetuity.</span>
                    </div>
                  </div>
                </div>

                {/* Governing Law & Jurisdiction */}
                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Governing Law & Jurisdiction
                  </h3>
                  <div className="mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-800 dark:text-slate-200">
                    <p>
                      <span className="text-slate-500 dark:text-slate-400">
                        Governing Law:
                      </span>{" "}
                      <strong className="font-semibold">
                        State of {formData.governingLaw || "—"}
                      </strong>
                    </p>
                    <p>
                      <span className="text-slate-500 dark:text-slate-400">
                        Jurisdiction:
                      </span>{" "}
                      <strong className="font-semibold">
                        {formData.jurisdiction || "—"}
                      </strong>
                    </p>
                  </div>
                </div>

                {/* MNDA Modifications */}
                <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    MNDA Modifications
                  </h3>
                  <p className="mt-1 text-sm text-slate-800 dark:text-slate-200">
                    {formData.modifications || "None"}
                  </p>
                </div>

                {/* Signature Table */}
                <div className="border-t-2 border-slate-200 pt-6 dark:border-slate-800">
                  <p className="mb-4 text-xs font-medium text-slate-600 dark:text-slate-400 italic">
                    By signing this Cover Page, each party agrees to enter into
                    this MNDA as of the Effective Date.
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden dark:border-slate-800">
                      <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="p-3 font-semibold text-slate-600 dark:text-slate-300 w-1/3">
                            Field
                          </th>
                          <th className="p-3 font-semibold text-indigo-700 dark:text-indigo-400 w-1/3">
                            PARTY 1
                          </th>
                          <th className="p-3 font-semibold text-indigo-700 dark:text-indigo-400 w-1/3">
                            PARTY 2
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950">
                        <tr>
                          <td className="p-3 font-medium text-slate-500 dark:text-slate-400">
                            Company
                          </td>
                          <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                            {p1.company || <span className="text-slate-300">____________________</span>}
                          </td>
                          <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">
                            {p2.company || <span className="text-slate-300">____________________</span>}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500 dark:text-slate-400">
                            Signature
                          </td>
                          <td className="p-3 font-mono text-slate-400">
                            ____________________
                          </td>
                          <td className="p-3 font-mono text-slate-400">
                            ____________________
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500 dark:text-slate-400">
                            Print Name
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p1.name || <span className="text-slate-300">____________________</span>}
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p2.name || <span className="text-slate-300">____________________</span>}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500 dark:text-slate-400">
                            Title
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p1.title || <span className="text-slate-300">____________________</span>}
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p2.title || <span className="text-slate-300">____________________</span>}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500 dark:text-slate-400">
                            Notice Address / Email
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p1.emailOrAddress || (
                              <span className="text-slate-300">____________________</span>
                            )}
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p2.emailOrAddress || (
                              <span className="text-slate-300">____________________</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-slate-500 dark:text-slate-400">
                            Date
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p1.date || <span className="text-slate-300">____________________</span>}
                          </td>
                          <td className="p-3 text-slate-800 dark:text-slate-200">
                            {p2.date || <span className="text-slate-300">____________________</span>}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Separator if full view */}
            {activeTab === "full" && (
              <div className="my-10 border-t-2 border-dashed border-slate-200 dark:border-slate-800 relative text-center">
                <span className="relative -top-3 bg-white px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:bg-slate-950">
                  Standard Terms Below
                </span>
              </div>
            )}

            {/* Standard Terms Section */}
            {(activeTab === "full" || activeTab === "terms") && (
              <div className="space-y-6 pt-2">
                <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
                  <h2 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">
                    Common Paper Mutual NDA Standard Terms (Version 1.0)
                  </h2>
                </div>

                <div className="space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      1. Introduction
                    </h4>
                    <p className="mt-1">
                      This Mutual Non-Disclosure Agreement (which incorporates these
                      Standard Terms and the Cover Page) (“MNDA”) allows each
                      party (“Disclosing Party”) to disclose or make available
                      information in connection with the Purpose which (1) the
                      Disclosing Party identifies to the receiving party (“Receiving
                      Party”) as “confidential”, “proprietary”, or the like or (2)
                      should be reasonably understood as confidential or
                      proprietary due to its nature and the circumstances of its
                      disclosure (“Confidential Information”).
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      2. Use and Protection of Confidential Information
                    </h4>
                    <p className="mt-1">
                      The Receiving Party shall: (a) use Confidential Information
                      solely for the Purpose; (b) not disclose Confidential
                      Information to third parties without the Disclosing Party’s
                      prior written approval...; and (c) protect Confidential
                      Information using at least the same protections the Receiving
                      Party uses for its own similar information but no less than a
                      reasonable standard of care.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      3. Exceptions
                    </h4>
                    <p className="mt-1">
                      The Receiving Party’s obligations do not apply to
                      information that it can demonstrate: (a) is or becomes
                      publicly available through no fault of the Receiving Party;
                      (b) it rightfully knew or possessed prior to receipt; (c) it
                      rightfully obtained from a third party; or (d) it
                      independently developed without using or referencing the
                      Confidential Information.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      4. Disclosures Required by Law
                    </h4>
                    <p className="mt-1">
                      The Receiving Party may disclose Confidential Information to
                      the extent required by law, regulation, subpoena or court
                      order, provided it gives reasonable advance notice where
                      legally permitted.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      5. Term and Termination
                    </h4>
                    <p className="mt-1">
                      Commences on the Effective Date and expires at the end of the
                      MNDA Term. Either party may terminate upon written notice.
                      Confidentiality obligations survive for the Term of
                      Confidentiality.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      6. Return or Destruction of Confidential Information
                    </h4>
                    <p className="mt-1">
                      Upon expiration or termination, Receiving Party will cease
                      using and promptly destroy or return Confidential
                      Information, subject to standard archival backups.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      7. Proprietary Rights
                    </h4>
                    <p className="mt-1">
                      Disclosing Party retains all intellectual property rights. No
                      license is granted.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      8. Disclaimer
                    </h4>
                    <p className="mt-1 uppercase text-slate-600 dark:text-slate-400">
                      ALL CONFIDENTIAL INFORMATION IS PROVIDED “AS IS”, WITH ALL
                      FAULTS, AND WITHOUT WARRANTIES OF ANY KIND.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      9. Governing Law and Jurisdiction
                    </h4>
                    <p className="mt-1">
                      Governed by the laws of the State of{" "}
                      <strong className="text-indigo-600 dark:text-indigo-400">
                        {formData.governingLaw || "[State]"}
                      </strong>
                      . Exclusive venue is{" "}
                      <strong className="text-indigo-600 dark:text-indigo-400">
                        {formData.jurisdiction || "[Courts]"}
                      </strong>
                      .
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      10. Equitable Relief
                    </h4>
                    <p className="mt-1">
                      Injunctive relief is available for irreparable harm caused by
                      breach.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      11. General
                    </h4>
                    <p className="mt-1">
                      Entire agreement; assignments require consent except M&A;
                      modifications must be written; counterpart executions valid.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* License Footer */}
            <div className="mt-12 border-t border-slate-100 pt-4 text-center text-[11px] text-slate-400 dark:border-slate-800">
              Common Paper Mutual Non-Disclosure Agreement (Version 1.0) is
              released free to use and modify under{" "}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Creative Commons Attribution 4.0 International (CC BY 4.0)
              </a>
              .
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
