import React from "react";
import { CompanyInfo } from "../../types/form";

type Props = {
  value: CompanyInfo;
  onChange: (val: CompanyInfo) => void;
  onNext: () => void;
  disabled: boolean;
};

export default function StepCompanyInfo({ value, onChange, onNext, disabled }: Props) {
  return (
    <form className="max-w-xl mx-auto flex flex-col gap-6" onSubmit={e => { e.preventDefault(); onNext(); }}>
      <h2 className="text-2xl font-bold mb-2">Enter Company Info</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={value.businessName} onChange={e => onChange({ ...value, businessName: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tagline</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={value.tagline} onChange={e => onChange({ ...value, tagline: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">About</label>
        <textarea className="w-full border rounded px-3 py-2" value={value.aboutText} onChange={e => onChange({ ...value, aboutText: e.target.value })} required rows={3} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contact Email</label>
        <input type="email" className="w-full border rounded px-3 py-2" value={value.email} onChange={e => onChange({ ...value, email: e.target.value })} required />
      </div>
      <div className="flex justify-end mt-4">
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={disabled}>Next</button>
      </div>
    </form>
  );
} 