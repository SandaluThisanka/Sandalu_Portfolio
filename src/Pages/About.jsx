// Troubleshooting: if `npm start` fails with "'react-scripts' is not recognized",
// run these commands in the project root:
// 1) npm install
// 2) npm install react-scripts@5.0.1 --save
// 3) If still failing: rm -rf node_modules package-lock.json && npm install
// 4) You can also try: npx react-scripts start
// 5) Ensure Node.js >= 14 (node -v)

import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import projectsData from "../data/projects.json";
import certificatesData from "../data/certificates.json";
import profilePortrait from "../assets/ai-generated-image-1757061305565.png";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="relative inline-block group">
      <h2 
        className="text-4xl font-bold md:text-5xl accent-heading text-glow" 
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
      <Sparkles className="w-5 h-5 text-[rgba(250,204,21,0.9)]" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-[rgba(250,204,21,0.9)]" />
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
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-l from-[#fde68a] via-[#f59e0b] to-[#d97706] blur-2xl animate-pulse-slow" />
        <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-t from-[#facc15] via-[#fbbf24] to-[#f59e0b] blur-2xl animate-float" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(250,204,21,0.28)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 z-20 transition-all duration-700 border-4 rounded-full border-white/20 group-hover:border-white/40 group-hover:scale-105" />
          
          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 z-10 hidden transition-opacity duration-700 bg-gradient-to-b from-black/25 via-transparent to-black/45 group-hover:opacity-0 sm:block" />
          <div className="absolute inset-0 z-10 hidden transition-opacity duration-700 opacity-0 bg-gradient-to-t from-[#facc15]/22 via-transparent to-[#f59e0b]/20 group-hover:opacity-100 sm:block" />
          
          <img
            src={profilePortrait}
            alt="Sandalu Thisanka — portrait"
            className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
            decoding="async"
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
    <div className="relative z-10 flex flex-col justify-between h-full p-6 transition-all duration-300 glow-card rounded-2xl hover:scale-105 hover:shadow-2xl">
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
    
    // Use a past start date so Years of Experience is non-negative in the UI
    const startDate = new Date("2020-02-06");
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
      color: "from-[#facc15] to-[#fbbf24]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#fbbf24] to-[#f59e0b]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#facc15] to-[#f59e0b]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="page-section h-auto pb-[10%] text-foreground overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0"
      id="About"
    >
      <div className="section-glow -top-40 -left-20" />
      <div className="section-glow section-glow--pink bottom-[-18rem] right-[-12rem]" />
      <div className="section-content">
        <Header />

        <div className="relative w-full pt-8 mx-auto sm:pt-12">
          <div className="flex flex-col-reverse items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 text-center lg:text-left">
              <h2 
                className="text-3xl font-bold sm:text-4xl lg:text-5xl"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <span className="accent-heading">
                  Hello, I'm
                </span>
                <span 
                  className="block mt-2 text-[rgba(255,250,209,0.92)]"
                  data-aos="fade-right"
                  data-aos-duration="1300"
                >
                  Sandalu Thisanka
                </span>
              </h2>
              
              <p 
                className="pb-4 text-base leading-relaxed text-justify text-gray-400 sm:text-lg lg:text-xl sm:pb-0"
                data-aos="fade-right"
                data-aos-duration="1500"
              >
                A highly skilled full-stack software developer with a passion for building efficient and scalable applications across various platforms. My expertise spans multiple programming languages, frameworks, and tools, enabling me to craft tailored solutions for both frontend and backend development.
                Check out my projects.
              </p>

              <div className="flex flex-col items-center w-full gap-4 lg:flex-row lg:items-start lg:gap-4 lg:px-0">
                <a href="#Portofolio" className="w-full lg:w-auto">
                  <button 
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[rgba(250,204,21,0.45)] text-[rgba(250,204,21,0.92)] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[rgba(250,204,21,0.12)] hover:border-[rgba(250,204,21,0.6)] animate-bounce-slow delay-200"
                  >
                    <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                  </button>
                </a>
              </div>
            </div>

            <ProfileImage />
          </div>

          <a href="#Portofolio">
            <div className="grid grid-cols-1 gap-6 mt-16 cursor-pointer md:grid-cols-3">
              {statsData.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);