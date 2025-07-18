import React from "react";

interface HomepageTemplate3Props {
  businessName: string;
  tagline: string;
}

const HomepageTemplate3: React.FC<HomepageTemplate3Props> = ({ businessName, tagline }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-white">
    <div className="flex-1 flex flex-col items-center justify-center">
      <span className="text-gray-800 font-bold text-lg mb-2">{businessName}</span>
      <span className="text-gray-600 text-base">{tagline}</span>
    </div>
    <div className="w-full h-10 bg-green-500 flex items-center justify-center">
      <span className="text-white text-xs">Footer</span>
    </div>
  </div>
);

export default HomepageTemplate3; 