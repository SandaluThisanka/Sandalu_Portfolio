import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="page-section min-h-screen flex items-center justify-center px-4">
      <div className="section-glow -top-28 left-[-10%]" />
      <div className="section-glow section-glow--pink bottom-[-16rem] right-[-12%]" />
      <div className="section-content text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-[rgba(250,204,21,0.9)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent">
          Thank You!
        </h1>
        <p className="text-amber-100/80 text-lg mb-8">
          Your message has been received. I'll get back to you as soon as possible.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] text-[#0b0d18] rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_28px_45px_rgba(250,204,21,0.25)] active:scale-[0.98]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;