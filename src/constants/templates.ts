// constants/templates.ts
import HomepageTemplate1 from "../components/templates/Homepage/HomepageTemplate1";
import HomepageTemplate2 from "../components/templates/Homepage/HomepageTemplate2";
import HomepageTemplate3 from "../components/templates/Homepage/HomepageTemplate3";
import ContactUsTemplate1 from "../components/templates/ContactUs/ContactUsTemplate1";
import ContactUsTemplate2 from "../components/templates/ContactUs/ContactUsTemplate2";
import ContactUsTemplate3 from "../components/templates/ContactUs/ContactUsTemplate3";
import AboutUsTemplate1 from "../components/templates/AboutUs/AboutUsTemplate1";
import AboutUsTemplate2 from "../components/templates/AboutUs/AboutUsTemplate2";
import AboutUsTemplate3 from "../components/templates/AboutUs/AboutUsTemplate3";
import {
  HomepageTemplateKey,
  ContactUsTemplateKey,
  AboutUsTemplateKey,
} from "../types/form";

export const HomepageTemplates = [
  { key: "homepage1" as HomepageTemplateKey, name: "Homepage Style 1", Component: HomepageTemplate1 },
  { key: "homepage2" as HomepageTemplateKey, name: "Homepage Style 2", Component: HomepageTemplate2 },
  { key: "homepage3" as HomepageTemplateKey, name: "Homepage Style 3", Component: HomepageTemplate3 },
];

export const ContactTemplates = [
  { key: "contact1" as ContactUsTemplateKey, name: "Contact Style 1", Component: ContactUsTemplate1 },
  { key: "contact2" as ContactUsTemplateKey, name: "Contact Style 2", Component: ContactUsTemplate2 },
  { key: "contact3" as ContactUsTemplateKey, name: "Contact Style 3", Component: ContactUsTemplate3 },
];

export const AboutTemplates = [
  { key: "about1" as AboutUsTemplateKey, name: "About Us Style 1", Component: AboutUsTemplate1 },
  { key: "about2" as AboutUsTemplateKey, name: "About Us Style 2", Component: AboutUsTemplate2 },
  { key: "about3" as AboutUsTemplateKey, name: "About Us Style 3", Component: AboutUsTemplate3 },
];
