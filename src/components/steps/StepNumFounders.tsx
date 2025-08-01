import React, { useState } from "react";

type Props = {
  value: number;
  onNext: (val: number) => void;
  onBack: () => void;
};

export default function StepNumFounders({ value, onNext, onBack }: Props) {
  const [localNum, setLocalNum] = useState<number>(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(localNum);
  };
  return (
    <form className="max-w-xl mx-auto flex flex-col gap-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">How many founders?</h2>
      <div>
        <label className="block text-sm font-medium mb-1">Number of Founders</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={localNum}
          onChange={(e) =>
            setLocalNum(Number((e.target as HTMLSelectElement).value))
          }
        >
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" className="bg-gray-200 text-gray-700 px-6 py-2 rounded" onClick={onBack}>Back</button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Next</button>
      </div>
    </form>
  );
} 