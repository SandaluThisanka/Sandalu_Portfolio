import React, { useMemo, useState } from 'react';

const TechStackIcon = ({ TechStackIcon: iconSrc, Language }) => {
  const [hasError, setHasError] = useState(false);

  const initials = useMemo(() => {
    if (!Language) return '?';
    return Language.split(/\s+/)
      .map((word) => word.charAt(0))
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [Language]);

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 transition-all duration-300 ease-in-out shadow-lg cursor-pointer group rounded-2xl bg-slate-900/60 hover:bg-slate-800/70 hover:scale-105 hover:shadow-[#f6c500]/20 backdrop-blur">
      <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20">
        <div className="absolute transition duration-300 rounded-full opacity-0 -inset-1 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] group-hover:opacity-60 blur"></div>
        {hasError || !iconSrc ? (
          <span className="relative flex items-center justify-center w-full h-full text-base font-semibold tracking-widest uppercase border rounded-full bg-white/5 text-white/70 border-white/10">
            {initials}
          </span>
        ) : (
          <img
            src={iconSrc}
            alt={`${Language} icon`}
            loading="lazy"
            className="relative object-contain transition-transform duration-300 transform w-14 h-14 md:w-16 md:h-16 group-hover:scale-105"
            onError={() => setHasError(true)}
          />
        )}
      </div>
      <span className="text-sm font-semibold tracking-wide transition-colors duration-300 text-slate-200 md:text-base group-hover:text-white">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;