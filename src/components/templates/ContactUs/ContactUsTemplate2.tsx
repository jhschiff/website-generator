import React from "react";

interface ContactUsTemplate2Props {
  email: string;
}

const ContactUsTemplate2: React.FC<ContactUsTemplate2Props> = ({ email }) => (
  <div className="w-full h-full flex bg-gray-100">
    <div className="w-16 h-full bg-purple-600 flex flex-col items-center justify-center">
      <span className="text-white font-bold text-xs rotate-[-90deg] whitespace-nowrap">Contact</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 text-base text-center px-2">{email}</span>
    </div>
  </div>
);

export default ContactUsTemplate2; 