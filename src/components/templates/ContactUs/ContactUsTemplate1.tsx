import React from "react";

interface ContactUsTemplate1Props {
  email: string;
}

const ContactUsTemplate1: React.FC<ContactUsTemplate1Props> = ({ email }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white">
    <div className="w-full h-10 bg-blue-600 flex items-center justify-center">
      <span className="text-white font-bold text-lg">Contact</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 text-base text-center px-2">{email}</span>
    </div>
  </div>
);

export default ContactUsTemplate1; 