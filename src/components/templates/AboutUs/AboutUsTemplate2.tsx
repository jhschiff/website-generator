import React from "react";

interface AboutUsTemplate2Props {
  businessName: string;
  aboutText: string;
}

const AboutUsTemplate2: React.FC<AboutUsTemplate2Props> = ({ businessName, aboutText }) => (
  <div className="w-full h-full flex bg-gray-100">
    <div className="w-16 h-full bg-purple-400 flex flex-col items-center justify-center">
      <span className="text-white font-bold text-xs rotate-[-90deg] whitespace-nowrap">About {businessName}</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 text-base text-center px-2">{aboutText}</span>
    </div>
  </div>
);

export default AboutUsTemplate2; 