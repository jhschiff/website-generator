import React from "react";
import StepContactTemplate from "../components/steps/StepContactTemplate";
import HomepageTemplate1 from "../components/templates/Homepage/HomepageTemplate1";
import HomepageTemplate2 from "../components/templates/Homepage/HomepageTemplate2";
import HomepageTemplate3 from "../components/templates/Homepage/HomepageTemplate3";
import ContactUsTemplate1 from "../components/templates/ContactUs/ContactUsTemplate1";
import ContactUsTemplate2 from "../components/templates/ContactUs/ContactUsTemplate2";
import ContactUsTemplate3 from "../components/templates/ContactUs/ContactUsTemplate3";
import AboutUsTemplate1 from "../components/templates/AboutUs/AboutUsTemplate1";
import AboutUsTemplate2 from "../components/templates/AboutUs/AboutUsTemplate2";
import AboutUsTemplate3 from "../components/templates/AboutUs/AboutUsTemplate3";
import { HomepageTemplateKey, ContactUsTemplateKey, AboutUsTemplateKey } from "../types/form";
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
  const homepageTemplates = [
    { key: "homepage1" as HomepageTemplateKey, name: "Homepage Style 1", Component: HomepageTemplate1 },
    { key: "homepage2" as HomepageTemplateKey, name: "Homepage Style 2", Component: HomepageTemplate2 },
    { key: "homepage3" as HomepageTemplateKey, name: "Homepage Style 3", Component: HomepageTemplate3 },
  ];
  const contactTemplates = [
    { key: "contact1" as ContactUsTemplateKey, name: "Contact Style 1", Component: ContactUsTemplate1 },
    { key: "contact2" as ContactUsTemplateKey, name: "Contact Style 2", Component: ContactUsTemplate2 },
    { key: "contact3" as ContactUsTemplateKey, name: "Contact Style 3", Component: ContactUsTemplate3 },
  ];
  const aboutTemplates = [
    { key: "about1" as AboutUsTemplateKey, name: "About Us Style 1", Component: AboutUsTemplate1 },
    { key: "about2" as AboutUsTemplateKey, name: "About Us Style 2", Component: AboutUsTemplate2 },
    { key: "about3" as AboutUsTemplateKey, name: "About Us Style 3", Component: AboutUsTemplate3 },
  ];

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

  if (templateStep === 1) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Choose a Homepage Template</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homepageTemplates.map(({ key, name, Component }) => (
            <button
              key={key}
              className={previewButtonClass(form.homepageTemplate === key)}
              onClick={() => setForm(f => ({ ...f, homepageTemplate: key as HomepageTemplateKey }))}
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
  }
  if (templateStep === 2) {
    return (
      <StepContactTemplate
        value={form.contactTemplate}
        onChange={val => setForm(f => ({ ...f, contactTemplate: val }))}
        onNext={() => setTemplateStep(3)}
        onBack={() => setTemplateStep(1)}
        templates={contactTemplates}
        disabled={!form.contactTemplate}
        dummyData={dummyData}
      />
    );
  }
    if (templateStep === 3) {
    return (
      <StepAboutTemplate
        value={form.aboutTemplate}
        onChange={val => setForm(f => ({ ...f, aboutTemplate: val }))}
        onNext={() => setSection(3)}
        onBack={() => setTemplateStep(2)}
        templates={aboutTemplates}
        disabled={!form.aboutTemplate}
      />
    );
  }
  return null;
};

export default TemplateSection; 