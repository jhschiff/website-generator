"use client";

import React, { useState } from "react";
import { FormState } from "../types/form";
import InputSection from "./InputSection";
import TemplateSection from "./TemplateSection";

export default function Home() {
  // Form state
  const [form, setForm] = useState<FormState>({
    company: { businessName: "", tagline: "", aboutText: "", email: "" },
    founders: [{ name: "", title: "", bio: "", linkedIn: "" }],
    contact: { phone: "", address: "", socialLinks: [""] },
    homepageTemplate: null,
    aboutTemplate: null,
    contactTemplate: null,
  });
  const [section, setSection] = useState(1); // 1: Input, 2: Template, 3: Styles
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error('Failed to submit');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Section 2: Template Selection
  const [templateStep, setTemplateStep] = useState(1);

  // Section 3: Styles (placeholder)
  const renderStylesSection = () => (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <h2 className="text-2xl font-bold mb-6">Set Styles</h2>
      <p className="text-gray-600 mb-4">Style customization coming soon! (colors, fonts, etc.)</p>
      <button
        className="bg-gray-200 text-gray-700 px-6 py-2 rounded"
        onClick={() => setSection(2)}
      >
        Back
      </button>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">Section {section} of 3</div>
          <h1 className="text-3xl font-bold">Website Generator</h1>
        </div>
        {section === 1 && (
          <InputSection
            form={form}
            setForm={setForm}
            loading={loading}
            success={success}
            error={error}
            handleSubmit={handleSubmit}
            onSectionComplete={() => setSection(2)} // move to templates after submission
          />
        )}
        {section === 2 && (
          <TemplateSection
            templateStep={templateStep}
            setTemplateStep={setTemplateStep}
            form={form}
            setForm={setForm}
            setSection={setSection}
          />
        )}
        {section === 3 && renderStylesSection()}
      </div>
    </div>
  );
}
