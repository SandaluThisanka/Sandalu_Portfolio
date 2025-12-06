import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="page-section min-h-screen flex items-center justify-center">
      <div className="section-glow -top-28 left-[-12%]" />
      <div className="section-glow section-glow--blue bottom-[-18rem] right-[-10%]" />
      <div className="section-content relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] rounded-full opacity-20 blur-2xl animate-pulse"></div>
        <div className="relative flex flex-col items-center gap-4 p-8">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[rgba(250,204,21,0.85)] animate-spin"></div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] rounded blur opacity-20"></div>
            <span className="relative text-amber-100/90 text-sm">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;