import React from "react";

interface HomepageTemplate2Props {
  businessName: string;
  tagline: string;
}

const HomepageTemplate2: React.FC<HomepageTemplate2Props> = ({ businessName, tagline }) => (
  <div className="w-full h-full flex bg-gray-100">
    <div className="w-16 h-full bg-purple-500 flex flex-col items-center justify-center">
      <span className="text-white font-bold text-xs rotate-[-90deg] whitespace-nowrap">{businessName}</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 text-base font-medium">{tagline}</span>
    </div>
  </div>
);

export default HomepageTemplate2; 