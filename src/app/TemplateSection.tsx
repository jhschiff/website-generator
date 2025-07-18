import React from "react";
import StepContactTemplate from "../components/steps/StepContactTemplate";
import HomepageTemplate1 from "../components/templates/Homepage/HomepageTemplate1";
import HomepageTemplate2 from "../components/templates/Homepage/HomepageTemplate2";
import HomepageTemplate3 from "../components/templates/Homepage/HomepageTemplate3";
import { HomepageTemplateKey, ContactUsTemplateKey } from "../types/form";

interface TemplateSectionProps {
  templateStep: number;
  setTemplateStep: (n: number) => void;
  form: any;
  setForm: (fn: (f: any) => any) => void;
  homepageTemplates: any[];
  contactTemplates: any[];
  dummyData: any;
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
  homepageTemplates,
  contactTemplates,
  dummyData,
  setSection,
}) => {
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
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded"
            onClick={() => setSection(1)}
          >
            Back
          </button>
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
        onNext={() => setSection(3)}
        onBack={() => setTemplateStep(1)}
        templates={contactTemplates}
        disabled={!form.contactTemplate}
        dummyData={dummyData}
      />
    );
  }
  return null;
};

export default TemplateSection; 