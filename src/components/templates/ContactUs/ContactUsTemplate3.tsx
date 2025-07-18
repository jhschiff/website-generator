import React from "react";

interface ContactUsTemplateProps {
  businessName: string;
  email: string;
  phone: string;
  socialLinks: string[];
}

const ContactUsTemplate3: React.FC<ContactUsTemplateProps> = ({
  businessName,
  email,
  phone,
  socialLinks,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="flex flex-col md:flex-row max-w-3xl w-full bg-gray-50 rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-4 text-blue-700">Contact {businessName}</h1>
          <div className="mb-2">Email: <a href={`mailto:${email}`} className="text-blue-600 underline">{email}</a></div>
          <div className="mb-4">Phone: <a href={`tel:${phone}`} className="text-blue-600 underline">{phone}</a></div>
          <div className="flex flex-col gap-2">
            {socialLinks.map((link, i) => (
              <a key={i} href={link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Social {i+1}</a>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 w-full bg-blue-100 flex items-center justify-center p-8">
          <span className="text-6xl text-blue-300 font-extrabold">@</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUsTemplate3; 