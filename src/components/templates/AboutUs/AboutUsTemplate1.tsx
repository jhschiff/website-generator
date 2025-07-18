import React from "react";

interface AboutUsTemplate1Props {
  businessName: string;
  aboutText: string;
}

const AboutUsTemplate1: React.FC<AboutUsTemplate1Props> = ({ businessName, aboutText }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white">
    <div className="w-full h-10 bg-blue-400 flex items-center justify-center">
      <span className="text-white font-bold text-lg">About {businessName}</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 text-base text-center px-2">{aboutText}</span>
    </div>
  </div>
);

export default AboutUsTemplate1; 