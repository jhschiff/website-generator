import React, { useState } from "react";
import StepCompanyInfo from "../components/steps/StepCompanyInfo";
import StepNumFounders from "../components/steps/StepNumFounders";
import StepFounderInfo from "../components/steps/StepFounderInfo";
import StepContactInfo from "../components/steps/StepContactInfo";

interface InputSectionProps {
  form: any;
  setForm: (fn: (f: any) => any) => void;
  loading: boolean;
  success: boolean;
  error: string | null;
  handleSubmit: () => void;
  onSectionComplete: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  form,
  setForm,
  loading,
  success,
  error,
  handleSubmit,
  onSectionComplete,
}) => {
  const [step, setStep] = useState(1);
  const [currentFounder, setCurrentFounder] = useState(0);
  const [numFounders, setNumFounders] = useState(1);

  const founderStart = 3;
  const founderEnd =  founderStart + numFounders - 1;
  const contactStep = founderEnd + 1;
  const submitStep = contactStep + 1;

  console.log("f", form)

  // Comapny Info
  if (step === 1) {
    return (
      <StepCompanyInfo
        value={form.company}
        onNext={() => setStep(2)}
      />
    );
  }

  // Number of Founders
  if (step === 2) {
    return (
      <StepNumFounders
        value={numFounders}
        onNext={(finalNum) => {
          setNumFounders(finalNum)
          setForm(f => ({ ...f, founders: Array(numFounders).fill({ name: "", title: "", bio: "", linkedIn: "" }) }));
          setCurrentFounder(0);
          setStep(3);
        }}
        onBack={() => setStep(1)}
      />
    );
  }

  // Founder Step (dynamic)
  if (step >= founderStart && step <= founderEnd) {
    const founderIdx = step - founderStart;
    const founder = form.founders[founderIdx] || { name: "", title: "", bio: "", linkedIn: "" };
    return (
      <StepFounderInfo
        value={founder}
        index={founderIdx}
        total={numFounders}
        onNext={(updatedFounder) => {
          // Save only once when Next is clicked
          const updatedFounders = [...form.founders];
          updatedFounders[founderIdx] = updatedFounder;
          setForm((f) => ({ ...f, founders: updatedFounders }));
  
          // Move to next founder or contact step
          if (founderIdx < numFounders - 1) {
            setCurrentFounder(founderIdx + 1);
            setStep(step + 1);
          } else {
            setStep(contactStep);
          }
        }}
        onBack={() => {
          if (founderIdx === 0) {
            setStep(2);
          } else {
            setCurrentFounder(founderIdx - 1);
            setStep(step - 1);
          }
        }}
      />
    );
  }

  // Contact Info
  if (step === contactStep) {
    return (
      <StepContactInfo
        value={form.contact}
        onNext={() => setStep(submitStep)}
        onBack={() => setStep(founderEnd)}
        loading={loading}
      />
    );
  }

  if (step === submitStep) {
    const { company, founders, contact } = form;

    return (
      <div className="flex flex-col items-center text-center space-y-4">
        <p className="text-gray-600">
          Click "Submit" to save your information and move to template selection.
        </p>
        <div className="w-full text-left bg-gray-50 p-4 rounded-md shadow-sm space-y-4">
        
        {/* Company Info */}
        <div>
          <h3 className="font-semibold text-lg mb-1">🏢 Company Info</h3>
          <p><span className="font-medium">Business Name:</span> {company.businessName || "—"}</p>
          <p><span className="font-medium">Tagline:</span> {company.tagline || "—"}</p>
          <p><span className="font-medium">About:</span> {company.aboutText || "—"}</p>
          <p><span className="font-medium">Email:</span> {company.email || "—"}</p>
        </div>

        {/* Founders */}
        <div>
          <h3 className="font-semibold text-lg mb-1">👤 Founders</h3>
          {founders.map((f, idx) => (
            <div key={idx} className="ml-4 mb-3 border-l-2 border-gray-200 pl-3 space-y-1">
              <p><span className="font-medium">Name:</span> {f.name || "—"}</p>
              <p><span className="font-medium">Title:</span> {f.title || "—"}</p>
              <p><span className="font-medium">Bio:</span> {f.bio || "—"}</p>
              <p><span className="font-medium">LinkedIn:</span> {f.linkedIn || "—"}</p>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-1">📞 Contact Info</h3>
          <p><span className="font-medium">Phone:</span> {contact.phone || "—"}</p>
          <p><span className="font-medium">Address:</span> {contact.address || "—"}</p>
          <p>
            <span className="font-medium">Social Links:</span>{" "}
            {contact.socialLinks?.filter(Boolean).length > 0
              ? contact.socialLinks.join(", ")
              : "—"}
          </p>
        </div>
      </div>

        {/* Loading/Error States */}
        {error && <div className="text-red-600">{error}</div>}
        {success && (
          <div className="text-green-600">
            Submission successful! Moving to next section...
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => setStep(contactStep)}
            disabled={loading}
          >
            Back
          </button>

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={loading}
            onClick={async () => {
              await handleSubmit();
              if (!error) onSectionComplete();
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    )
  }
  return null;
};

export default InputSection;