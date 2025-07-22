import React from "react";
import { AboutUsTemplateKey } from "../../types/form";

type TemplateOption = {
  key: AboutUsTemplateKey;
  name: string;
  Component: React.ComponentType<any>;
};

type Props = {
  value: AboutUsTemplateKey | null;
  onChange: (val: AboutUsTemplateKey) => void;
  onNext: () => void;
  onBack: () => void;
  templates: TemplateOption[];
  disabled: boolean;
};

export default function StepAboutTemplate({ value, onChange, onNext, onBack, templates, disabled }: Props) {
  const previewButtonClass = (selected: boolean) =>
    `relative border rounded-xl overflow-hidden shadow transition-all bg-gray-50 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 ring-blue-400 ${selected ? "ring-4 ring-blue-500 border-blue-400" : "border-gray-200"}`;
  const previewContainerClass = "w-96 h-60 flex flex-col items-center justify-center bg-white overflow-hidden aspect-[16/10]";

  return (
    <form onSubmit={e => { e.preventDefault(); onNext(); }}>
      <h2 className="text-2xl font-bold mb-6">Choose an About Us Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map(({ key, name, Component }) => (
          <button
            key={key}
            type="button"
            className={previewButtonClass(value === key)}
            onClick={() => onChange(key)}
            aria-label={`Select ${name} about us template`}
          >
            <div className={previewContainerClass}>
              <Component />
              <span className="absolute bottom-2 left-2 bg-white/80 text-xs font-semibold px-2 py-1 rounded shadow">{name}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded" onClick={onBack}>Back</button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={disabled}>Next</button>
      </div>
    </form>
  );
} 