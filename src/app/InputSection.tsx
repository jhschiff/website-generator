import React, { useState } from "react";
import StepCompanyInfo from "../components/steps/StepCompanyInfo";
import StepNumFounders from "../components/steps/StepNumFounders";
import StepFounderInfo from "../components/steps/StepFounderInfo";
import StepContactInfo from "../components/steps/StepContactInfo";
import { isCompanyInfoValid, isFounderInfoValid, isContactInfoValid } from "../utils/validation";

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
  // Validation logic must be here, after props destructuring
  const companyValid = isCompanyInfoValid(form.company);
  const founderValid = isFounderInfoValid(form.founders[currentFounder]);
  const contactValid = isContactInfoValid(form.contact);

  console.log("Step: ", step)

  if (step === 1) {
    return (
      <StepCompanyInfo
        value={form.company}
        onChange={company => setForm(f => ({ ...f, company }))}
        onNext={() => setStep(2)}
        disabled={!companyValid}
      />
    );
  }
  if (step === 2) {
    return (
      <StepNumFounders
        value={numFounders}
        onChange={n => setNumFounders(n)}
        onNext={() => {
          setForm(f => ({ ...f, founders: Array(numFounders).fill({ name: "", title: "", bio: "", linkedIn: "" }) }));
          setCurrentFounder(0);
          setStep(3);
        }}
        onBack={() => setStep(1)}
      />
    );
  }

  // Founder Step
  const founderStart = 3;
  const founderEnd =  founderStart + numFounders - 1;
  if (step >= founderStart && step <= founderEnd) {
    const founderIdx = step - founderStart;
    const founder = form.founders[founderIdx] || { name: "", title: "", bio: "", linkedIn: "" };
    return (
      <StepFounderInfo
        value={founder}
        onChange={val => {
          const updated = [...form.founders];
          updated[founderIdx] = val;
          setForm(f => ({ ...f, founders: updated }));
        }}
        onNext={() => {
          if (founderIdx < numFounders - 1) {
            setCurrentFounder(founderIdx + 1);
            setStep(step + 1);
          } else {
            setStep(2 + numFounders + 1);
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
        index={founderIdx}
        total={numFounders}
        disabled={!founderValid}
      />
    );
  }

  // Conatact info step
  if (step === founderEnd + 1) {
    return (
      <StepContactInfo
        value={form.contact}
        onChange={contact => setForm(f => ({ ...f, contact }))}
        onNext={async () => {
          handleSubmit(); // submit form only
          if (!error) onSectionComplete(); // go to templates
        }}
        onBack={() => setStep(founderEnd)}
        disabled={!contactValid || loading}
      />
    );
  }
  return null;
};

export default InputSection;