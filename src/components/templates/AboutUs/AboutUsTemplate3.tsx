import React from "react";

interface AboutUsTemplate3Props {
  businessName: string;
  aboutText: string;
}

const AboutUsTemplate3: React.FC<AboutUsTemplate3Props> = ({ businessName, aboutText }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white">
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 font-bold text-lg mb-2">About {businessName}</span>
      <span className="text-gray-600 text-base text-center px-2">{aboutText}</span>
    </div>
    <div className="w-full h-10 bg-green-400 flex items-center justify-center">
      <span className="text-white text-xs">About Us Footer</span>
    </div>
  </div>
);

export default AboutUsTemplate3; 