import React, { useMemo, useState } from "react";
import { FounderInfo } from "../../types/form";
import { isFounderInfoValid } from "../../utils/validation";

type Props = {
  value: FounderInfo;
  onNext: (val: FounderInfo) => void;
  onBack: () => void;
  index: number;
  total: number;
};

export default function StepFounderInfo({ value, onNext, onBack, index, total }: Props) {
  const [localFounder, setLocalFounder] = useState<FounderInfo>(value);
  
  const valid = useMemo(
    () => isFounderInfoValid(localFounder),
    [localFounder]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) {
      onNext(localFounder);
    }
  };

  return (
    <form
      className="max-w-xl mx-auto flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-2">Enter Founder Info</h2>
      <div className="text-sm text-gray-500 mb-2">
        Founder {index + 1} of {total}
      </div>

      {/* Founder Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Founder Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={localFounder.name}
          onChange={(e) =>
            setLocalFounder((f) => ({ ...f, name: e.target.value }))
          }
          required
        />
      </div>

      {/* Founder Title */}
      <div>
        <label className="block text-sm font-medium mb-1">Founder Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={localFounder.title}
          onChange={(e) =>
            setLocalFounder((f) => ({ ...f, title: e.target.value }))
          }
          required
        />
      </div>

      {/* Short Bio */}
      <div>
        <label className="block text-sm font-medium mb-1">Short Bio</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={localFounder.bio}
          onChange={(e) =>
            setLocalFounder((f) => ({ ...f, bio: e.target.value }))
          }
          required
          rows={3}
        />
      </div>

      {/* LinkedIn */}
      <div>
        <label className="block text-sm font-medium mb-1">
          LinkedIn (optional)
        </label>
        <input
          type="url"
          className="w-full border rounded px-3 py-2"
          value={localFounder.linkedIn || ""}
          onChange={(e) =>
            setLocalFounder((f) => ({ ...f, linkedIn: e.target.value }))
          }
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded"
          onClick={onBack}
        >
          Back
        </button>
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