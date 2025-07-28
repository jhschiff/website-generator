import React, { useState, useMemo } from "react";
import { CompanyInfo } from "../../types/form";
import { isCompanyInfoValid } from "../../utils/validation";

type Props = {
  value: CompanyInfo;
  onNext: (val: CompanyInfo) => void;
};

export default function StepCompanyInfo({ value, onNext }: Props) {
  const [localCompany, setLocalCompany] = useState<CompanyInfo>(value);
  const valid = useMemo(() => isCompanyInfoValid(localCompany), [localCompany]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) {
      onNext(localCompany);
    }
  };

  return (
    <form className="max-w-xl mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Enter Company Info</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={localCompany.businessName}
          onChange={(e) =>
            setLocalCompany((c) => ({ ...c, businessName: e.target.value }))
          }
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tagline</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={localCompany.tagline}
          onChange={(e) =>
            setLocalCompany((c) => ({ ...c, tagline: e.target.value }))
          }
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">About</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={localCompany.aboutText}
          onChange={(e) =>
            setLocalCompany((c) => ({ ...c, aboutText: e.target.value }))
          }
          required
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contact Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          value={localCompany.email}
          onChange={(e) =>
            setLocalCompany((c) => ({ ...c, email: e.target.value }))
          }
          required
        />
      </div>
      {/* Next button */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
          disabled={!valid}
        >
          Next
        </button>
      </div>
    </form>
  );
} 