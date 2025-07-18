import React from "react";
import { ContactInfo } from "../../types/form";

type Props = {
  value: ContactInfo;
  onChange: (val: ContactInfo) => void;
  onNext: () => void;
  onBack: () => void;
  disabled: boolean;
};

export default function StepContactInfo({ value, onChange, onNext, onBack, disabled }: Props) {
  const handleSocialLinkChange = (idx: number, link: string) => {
    const newLinks = [...value.socialLinks];
    newLinks[idx] = link;
    onChange({ ...value, socialLinks: newLinks });
  };
  const addSocialLink = () => onChange({ ...value, socialLinks: [...value.socialLinks, ""] });
  const removeSocialLink = (idx: number) => onChange({ ...value, socialLinks: value.socialLinks.filter((_, i) => i !== idx) });

  return (
    <form className="max-w-xl mx-auto flex flex-col gap-6" onSubmit={e => { e.preventDefault(); onNext(); }}>
      <h2 className="text-2xl font-bold mb-2">Enter Contact Info</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={value.phone} onChange={e => onChange({ ...value, phone: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={value.address} onChange={e => onChange({ ...value, address: e.target.value })} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Social Links</label>
        {value.socialLinks.map((link, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input type="url" className="w-full border rounded px-3 py-2" value={link} onChange={e => handleSocialLinkChange(idx, e.target.value)} placeholder="https://..." />
            {value.socialLinks.length > 1 && (
              <button type="button" className="text-red-500 px-2" onClick={() => removeSocialLink(idx)}>-</button>
            )}
            {idx === value.socialLinks.length - 1 && (
              <button type="button" className="text-green-600 px-2" onClick={addSocialLink}>+</button>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded" onClick={onBack}>Back</button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50" disabled={disabled}>Next</button>
      </div>
    </form>
  );
} 