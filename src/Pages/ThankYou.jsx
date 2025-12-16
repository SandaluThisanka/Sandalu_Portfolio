import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <CheckCircle className="w-20 h-20 text-[#f6c500]" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8]">
          Thank You!
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed px-4">
          Your message has been received. I'll get back to you as soon as possible.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] text-[#0c0d11] rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#f6c500]/25 active:scale-[0.98]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;