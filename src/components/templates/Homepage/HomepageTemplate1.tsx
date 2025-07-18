import React from "react";

interface HomepageTemplate1Props {
  businessName: string;
  tagline: string;
}

const HomepageTemplate1: React.FC<HomepageTemplate1Props> = ({ businessName, tagline }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white">
    <div className="w-full h-10 bg-blue-500 flex items-center justify-center">
      <span className="text-white font-bold text-lg">{businessName}</span>
    </div>
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 text-base font-medium">{tagline}</span>
    </div>
  </div>
);

export default HomepageTemplate1; 