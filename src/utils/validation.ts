import { CompanyInfo, FounderInfo, ContactInfo } from "../types/form";

export function isCompanyInfoValid(company: CompanyInfo): boolean {
  return Object.values(company).every(v => v.trim());
}

export function isFounderInfoValid(founder: FounderInfo): boolean {
  return founder.name.trim() !== "" && founder.title.trim() !== "" && founder.bio.trim() !== "";
}

export function isContactInfoValid(contact: ContactInfo): boolean {
  return contact.phone.trim() !== "" && contact.address.trim() !== "";
} 