"use client";

import React, { useState } from "react";
import {
  HomepageTemplateKey,
  AboutUsTemplateKey,
  ContactUsTemplateKey,
  FormState,
} from "../types/form";
import HomepageTemplate1 from "../components/templates/Homepage/HomepageTemplate1";
import HomepageTemplate2 from "../components/templates/Homepage/HomepageTemplate2";
import HomepageTemplate3 from "../components/templates/Homepage/HomepageTemplate3";
import AboutUsTemplate1 from "../components/templates/AboutUs/AboutUsTemplate1";
import AboutUsTemplate2 from "../components/templates/AboutUs/AboutUsTemplate2";
import AboutUsTemplate3 from "../components/templates/AboutUs/AboutUsTemplate3";
import ContactUsTemplate1 from "../components/templates/ContactUs/ContactUsTemplate1";
import ContactUsTemplate2 from "../components/templates/ContactUs/ContactUsTemplate2";
import ContactUsTemplate3 from "../components/templates/ContactUs/ContactUsTemplate3";
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
  const [step, setStep] = useState(1);
  const [numFounders, setNumFounders] = useState(1);
  const [currentFounder, setCurrentFounder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dummy data for previews
  const dummyData = {
    businessName: form.company.businessName || "Business Name",
    tagline: form.company.tagline || "We build the future.",
    logoUrl: undefined,
    aboutText: form.company.aboutText || "Company Name is a leader in innovative solutions.",
    mission: "Empowering businesses worldwide.",
    email: form.company.email || "info@company.com",
    phone: form.contact.phone || "123-456-7890",
    socialLinks: form.contact.socialLinks.filter(Boolean).length ? form.contact.socialLinks : ["https://twitter.com", "https://facebook.com"],
  };

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

  // Section 1: Input Info Steps
  const inputSteps = [
    'company',
    'numFounders',
    ...Array(numFounders).fill('founder'),
    'contact',
    'about',
  ];
  const inputStepCount = inputSteps.length;

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

  // Template configs
  const homepageTemplates = [
    { key: "homepage1" as HomepageTemplateKey, name: "Homepage Style 1", Component: HomepageTemplate1 },
    { key: "homepage2" as HomepageTemplateKey, name: "Homepage Style 2", Component: HomepageTemplate2 },
    { key: "homepage3" as HomepageTemplateKey, name: "Homepage Style 3", Component: HomepageTemplate3 },
  ];
  const aboutTemplates = [
    { key: "about1" as AboutUsTemplateKey, name: "About Style 1", Component: AboutUsTemplate1 },
    { key: "about2" as AboutUsTemplateKey, name: "About Style 2", Component: AboutUsTemplate2 },
    { key: "about3" as AboutUsTemplateKey, name: "About Style 3", Component: AboutUsTemplate3 },
  ];
  const contactTemplates = [
    { key: "contact1" as ContactUsTemplateKey, name: "Contact Style 1", Component: ContactUsTemplate1 },
    { key: "contact2" as ContactUsTemplateKey, name: "Contact Style 2", Component: ContactUsTemplate2 },
    { key: "contact3" as ContactUsTemplateKey, name: "Contact Style 3", Component: ContactUsTemplate3 },
  ];

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
            step={step}
            setStep={setStep}
            numFounders={numFounders}
            setNumFounders={setNumFounders}
            currentFounder={currentFounder}
            setCurrentFounder={setCurrentFounder}
            form={form}
            setForm={setForm}
            aboutTemplates={aboutTemplates}
            dummyData={dummyData}
            loading={loading}
            success={success}
            error={error}
            handleSubmit={handleSubmit}
            onSectionComplete={() => setSection(2)}
          />
        )}
        {section === 2 && (
          <TemplateSection
            templateStep={templateStep}
            setTemplateStep={setTemplateStep}
            form={form}
            setForm={setForm}
            homepageTemplates={homepageTemplates}
            contactTemplates={contactTemplates}
            dummyData={dummyData}
            setSection={setSection}
          />
        )}
        {section === 3 && renderStylesSection()}
      </div>
    </div>
  );
}
