import React from "react";

import {
  HomepageTemplates,
  ContactTemplates,
  AboutTemplates,
} from "../constants/templates";
import StepContactTemplate from "../components/steps/StepContactTemplate";
import StepAboutTemplate from "@/components/steps/StepAboutTemplate";

interface TemplateSectionProps {
  templateStep: number;
  setTemplateStep: (n: number) => void;
  form: any;
  setForm: (fn: (f: any) => any) => void;
  setSection: (n: number) => void;
}

const previewButtonClass = (selected: boolean) =>
  `relative border rounded-xl overflow-hidden shadow transition-all bg-gray-50 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 ring-blue-400 ${selected ? "ring-4 ring-blue-500 border-blue-400" : "border-gray-200"}`;

const previewContainerClass =
  "w-96 h-60 flex flex-col items-center justify-center bg-white overflow-hidden aspect-[16/10]";

const TemplateSection: React.FC<TemplateSectionProps> = ({
  templateStep,
  setTemplateStep,
  form,
  setForm,
  setSection,
}) => {
  const dummyData = {
    businessName: form.company.businessName || "Business Name",
    tagline: form.company.tagline || "We build the future.",
    logoUrl: undefined,
    aboutText: form.company.aboutText || "Company Name is a leader in innovative solutions.",
    mission: "Empowering businesses worldwide.",
    email: form.company.email || "info@company.com",
    phone: form.contact.phone || "123-456-7890",
    socialLinks: form.contact.socialLinks.filter(Boolean).length
      ? form.contact.socialLinks
      : ["https://twitter.com", "https://facebook.com"],
  };

  switch (templateStep) {
    case 1:
      return (
        <div>
          <h2 className="text-2xl font-bold mb-6">Choose a Homepage Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HomepageTemplates.map(({ key, name, Component }) => (
            <button
              key={key}
              className={previewButtonClass(form.homepageTemplate === key)}
              onClick={() => setForm(f => ({ ...f, homepageTemplate: key }))}
              aria-label={`Select ${name} homepage template`}
            >
              <div className={previewContainerClass}>
                <Component {...dummyData} />
                <span className="absolute bottom-2 left-2 bg-white/80 text-xs font-semibold px-2 py-1 rounded shadow">{name}</span>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            disabled={!form.homepageTemplate}
            onClick={() => setTemplateStep(2)}
          >
            Next
          </button>
        </div>
      </div>
    );
    case 2:
      return (
        <StepContactTemplate
          value={form.contactTemplate}
          onChange={val => setForm(f => ({ ...f, contactTemplate: val }))}
          onNext={() => setTemplateStep(3)}
          onBack={() => setTemplateStep(1)}
          templates={ContactTemplates}
          disabled={!form.contactTemplate}
          dummyData={dummyData}
        />
      );
    case 3:
      return (
        <StepAboutTemplate
          value={form.aboutTemplate}
          onChange={val => setForm(f => ({ ...f, aboutTemplate: val }))}
          onNext={() => setSection(3)}
          onBack={() => setTemplateStep(2)}
          templates={AboutTemplates}
          disabled={!form.aboutTemplate}
        />
      );
    default:
      return null
  }
};

export default TemplateSection; 