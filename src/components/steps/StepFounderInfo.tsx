import React from "react";
import { FounderInfo } from "../../types/form";

type Props = {
  value: FounderInfo;
  onChange: (val: FounderInfo) => void;
  onNext: () => void;
  onBack: () => void;
  index: number;
  total: number;
  disabled: boolean;
};

export default function StepFounderInfo({ value, onChange, onNext, onBack, index, total, disabled }: Props) {
  return (
    <form className="max-w-xl mx-auto flex flex-col gap-6" onSubmit={e => { e.preventDefault(); onNext(); }}>
      <h2 className="text-2xl font-bold mb-2">Enter Founder Info</h2>
      <div className="text-sm text-gray-500 mb-2">Founder {index + 1} of {total}</div>
      <div>
        <label className="block text-sm font-medium mb-1">Founder Name</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={value.name} onChange={e => onChange({ ...value, name: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Founder Title</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={value.title} onChange={e => onChange({ ...value, title: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Short Bio</label>
        <textarea className="w-full border rounded px-3 py-2" value={value.bio} onChange={e => onChange({ ...value, bio: e.target.value })} required rows={3} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">LinkedIn (optional)</label>
        <input type="url" className="w-full border rounded px-3 py-2" value={value.linkedIn || ""} onChange={e => onChange({ ...value, linkedIn: e.target.value })} placeholder="https://linkedin.com/in/username" />
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded" onClick={onBack}>Back</button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={disabled}>Next</button>
      </div>
    </form>
  );
} 