import React, { createContext, useContext, useState } from "react";

// Placeholder types for form data
export interface FormData {
  businessName: string;
  tagline: string;
  logo: File | null;
  aboutText: string;
  mission: string;
  aboutImage: File | null;
  email: string;
  phone: string;
  socialLinks: string[];
  template: string;
}

interface FormContextType {
  data: Partial<FormData>;
  setData: (data: Partial<FormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setDataState] = useState<Partial<FormData>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const setData = (newData: Partial<FormData>) => {
    setDataState((prev) => ({ ...prev, ...newData }));
  };

  return (
    <FormContext.Provider value={{ data, setData, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
};

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within a FormProvider");
  return context;
} 