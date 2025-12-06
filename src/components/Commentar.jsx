import React from "react";
import { MessageSquare } from "lucide-react";

// Simple supportive text card for the contact page
const Commentar = () => {
  return (
    <div className="h-full w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6 text-slate-200">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-purple-500/20 p-2 text-purple-200">
          <MessageSquare className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Response Time</p>
          <p className="text-lg font-semibold text-white">Typically within 24 hours</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-slate-300">
        Share a few details about your project or question. I read every message and will follow up with the next steps or a quick call option if that helps move faster.
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          <span>Available for freelance and collaboration.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden="true" />
          <span>Happy to demo recent projects on request.</span>
        </div>
      </div>
    </div>
  );
};

export default Commentar;
