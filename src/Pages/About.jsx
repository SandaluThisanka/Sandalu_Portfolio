import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import projectsData from "../data/projects.json";
import certificatesData from "../data/certificates.json";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="relative inline-block group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="flex items-center justify-center max-w-2xl gap-2 mx-auto mt-2 text-base text-gray-400 sm:text-lg"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-[#f6c500]" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-[#38bdf8]" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex items-center justify-end p-0 py-2 pb-2 sm:p-12 sm:py-0 sm:pb-0">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#fb923c] via-[#f97316] to-[#facc15] rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#38bdf8] via-[#0ea5e9] to-[#22d3ee] rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(246,197,0,0.35)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 z-20 transition-all duration-700 border-4 rounded-full border-white/20 group-hover:border-white/40 group-hover:scale-105" />
          
          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 z-10 hidden transition-opacity duration-700 bg-gradient-to-b from-black/20 via-transparent to-black/40 group-hover:opacity-0 sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f6c500]/20 via-transparent to-[#38bdf8]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          
          <img
            src="my.png"
            alt="Profile"
            className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 z-20 hidden transition-all duration-700 opacity-0 group-hover:opacity-100 sm:block">
            <div className="absolute inset-0 transition-transform duration-1000 transform -translate-x-full bg-gradient-to-tr from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
            <div className="absolute inset-0 transition-transform duration-1000 delay-100 transform translate-y-full bg-gradient-to-bl from-transparent via-white/10 to-transparent group-hover:-translate-y-full" />
            <div className="absolute inset-0 transition-transform duration-700 scale-0 border-8 rounded-full border-white/10 group-hover:scale-100 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 flex flex-col justify-between h-full p-6 overflow-hidden transition-all duration-300 border bg-gray-900/50 backdrop-blur-lg rounded-2xl border-white/10 hover:scale-105 hover:shadow-2xl">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-16 h-16 transition-transform rounded-full bg-white/10 group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="mb-2 text-sm tracking-wider text-gray-300 uppercase"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 transition-colors text-white/50 group-hover:text-white" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    
    const startDate = new Date("2025-02-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: projectsData.length,
      totalCertificates: certificatesData.length,
      YearExperience: experience
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#f6c500] via-[#fb923c] to-[#38bdf8]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#38bdf8] via-[#3b82f6] to-[#f6c500]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#fb923c] via-[#f6c500] to-[#38bdf8]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="overflow-hidden text-white section-shell"
      id="About"
    >
      <Header />

      <div className="relative w-full pt-8 mx-auto sm:pt-12">
        <div className="flex flex-col-reverse items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <h2 
              className="text-3xl font-bold sm:text-4xl lg:text-5xl"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8]">
                Hello, I'm
              </span>
              <span 
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Sandalu Thisanka
              </span>
            </h2>
            
            <p 
              className="pb-4 text-base leading-relaxed text-justify sm:text-lg lg:text-xl text-slate-300 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              A highly skilled full-stack software developer with a passion for building efficient and scalable applications across various platforms. My expertise spans multiple programming languages, frameworks, and tools, enabling me to craft tailored solutions for both frontend and backend development.
              Check out my projects.
            </p>

            <div className="flex flex-col items-center w-full gap-4 lg:flex-row lg:items-start lg:gap-4 lg:px-0">
             
              <a href="#Portofolio" onClick={(e)=>{e.preventDefault(); const s=document.querySelector('#Portofolio'); if(s){window.scrollTo({top: s.offsetTop - 110, behavior: 'smooth'});} }} className="w-full lg:w-auto">
              <button 
                data-aos="fade-up"
                data-aos-duration="1000"
                className="w-full btn btn-accent lg:w-auto"
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-[#0c0d11]" /> View Projects
              </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio" onClick={(e)=>{e.preventDefault(); const s=document.querySelector('#Portofolio'); if(s){window.scrollTo({top: s.offsetTop - 110, behavior: 'smooth'});} }}>
          <div className="grid grid-cols-1 gap-6 mt-16 cursor-pointer md:grid-cols-3">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);