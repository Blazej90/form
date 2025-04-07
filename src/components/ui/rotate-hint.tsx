// "use client";

// import React from "react";
// import { RotateCcw } from "lucide-react";

// export const RotateHint: React.FC = () => {
//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] md:hidden portrait:flex landscape:hidden px-4 text-center">
//       <RotateCcw className="w-12 h-12 text-gray-700 animate-spin-slow mb-4" />
//       <p className="text-base font-medium text-gray-700">
//         Aby wygodnie korzystać z aplikacji, obróć ekran poziomo
//       </p>
//     </div>
//   );
// };

"use client";

import { Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

export const RotateHint = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth;
      setIsVisible(isPortrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white px-6 sm:hidden animate-fade-in">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-rotate-icon">
          <Smartphone className="w-12 h-12" />
        </div>
        <p className="text-lg font-medium text-center">
          Obróć telefon poziomo,
          <br />
          aby wygodnie korzystać z kreatora formularza.
        </p>
      </div>
    </div>
  );
};
