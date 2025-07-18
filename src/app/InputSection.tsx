import React from "react";
import StepCompanyInfo from "../components/steps/StepCompanyInfo";
import StepNumFounders from "../components/steps/StepNumFounders";
import StepFounderInfo from "../components/steps/StepFounderInfo";
import StepContactInfo from "../components/steps/StepContactInfo";
import StepAboutTemplate from "../components/steps/StepAboutTemplate";
import { isCompanyInfoValid, isFounderInfoValid, isContactInfoValid } from "../utils/validation";

interface InputSectionProps {
  step: number;
  setStep: (n: number) => void;
  numFounders: number;
  setNumFounders: (n: number) => void;
  currentFounder: number;
  setCurrentFounder: (n: number) => void;
  form: any;
  setForm: (fn: (f: any) => any) => void;
  aboutTemplates: any[];
  dummyData: any;
  loading: boolean;
  success: boolean;
  error: string | null;
  handleSubmit: () => void;
  onSectionComplete: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  step,
  setStep,
  numFounders,
  setNumFounders,
  currentFounder,
  setCurrentFounder,
  form,
  setForm,
  aboutTemplates,
  dummyData,
  loading,
  success,
  error,
  handleSubmit,
  onSectionComplete,
}) => {
  // Validation logic must be here, after props destructuring
  const companyValid = isCompanyInfoValid(form.company);
  const founderValid = isFounderInfoValid(form.founders[currentFounder]);
  const contactValid = isContactInfoValid(form.contact);

  let idx = step - 1;
  let founderIdx = idx - 2;
  if (idx === 0) {
    return (
      <StepCompanyInfo
        value={form.company}
        onChange={company => setForm(f => ({ ...f, company }))}
        onNext={() => setStep(2)}
        disabled={!companyValid}
      />
    );
  }
  if (idx === 1) {
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
  if (idx >= 2 && idx < 2 + numFounders) {
    founderIdx = idx - 2;
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
  if (idx === 2 + numFounders) {
    return (
      <StepContactInfo
        value={form.contact}
        onChange={contact => setForm(f => ({ ...f, contact }))}
        onNext={() => setStep(2 + numFounders + 2)}
        onBack={() => setStep(2 + numFounders)}
        disabled={!contactValid}
      />
    );
  }
  if (idx === 2 + numFounders + 1) {
    React.useEffect(() => {
      if (!success && !loading) {
        handleSubmit();
      }
    }, []);
    React.useEffect(() => {
      if (success) {
        onSectionComplete();
      }
    }, [success]);
    return (
      <>
        <StepAboutTemplate
          value={form.aboutTemplate}
          onChange={val => setForm(f => ({ ...f, aboutTemplate: val }))}
          onNext={() => {}}
          onBack={() => setStep(2 + numFounders + 1)}
          templates={aboutTemplates}
          disabled={!form.aboutTemplate || loading}
          dummyData={dummyData}
        />
        {loading && <div className="text-blue-600 text-center mt-4">Submitting...</div>}
        {error && <div className="text-red-600 text-center mt-4">{error}</div>}
        {success && <div className="text-green-600 text-center mt-4">Submission successful!</div>}
      </>
    );
  }
  return null;
};

export default InputSection;