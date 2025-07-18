// Types and interfaces for the website generator form

export interface CompanyInfo {
  businessName: string;
  tagline: string;
  aboutText: string;
  email: string;
}

export interface FounderInfo {
  name: string;
  title: string;
  bio: string;
  linkedIn?: string;
}

export interface ContactInfo {
  phone: string;
  address: string;
  socialLinks: string[];
}

export type HomepageTemplateKey = "homepage1" | "homepage2" | "homepage3";
export type AboutUsTemplateKey = "about1" | "about2" | "about3";
export type ContactUsTemplateKey = "contact1" | "contact2" | "contact3";

export interface FormState {
  company: CompanyInfo;
  founders: FounderInfo[];
  contact: ContactInfo;
  homepageTemplate: HomepageTemplateKey | null;
  aboutTemplate: AboutUsTemplateKey | null;
  contactTemplate: ContactUsTemplateKey | null;
} 