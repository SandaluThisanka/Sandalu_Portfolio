import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#05060c] flex items-center justify-center">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] rounded-full opacity-25 blur-3xl animate-pulse"></div>
        <div className="relative flex flex-col items-center gap-4 p-8">
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#f6c500] animate-spin"></div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] rounded blur opacity-25"></div>
            <span className="relative text-gray-200 text-sm">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;