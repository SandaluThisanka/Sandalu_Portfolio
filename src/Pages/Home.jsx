import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] rounded-full blur opacity-40 group-hover:opacity-70 transition duration-700"></div>
      <div className="relative px-3 py-2 border rounded-full sm:px-4 bg-black/50 backdrop-blur-xl border-white/10">
        <span className="gradient-title sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-[#f6c500] " />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#0ea5e9]/50 via-[#f6c500]/40 to-transparent blur-3xl opacity-70"></span>
        <span className="relative gradient-title">
          Fullstack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#f6c500]/50 via-[#38bdf8]/40 to-transparent blur-3xl opacity-70"></span>
        <span className="relative gradient-title">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-sm border border-white/10 text-sm text-slate-200 hover:border-[#f6c500]/30 transition-all">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, variant = "accent" }) => {
  const handleClick = (e) => {
    if (href && href.startsWith("#")) {
      e?.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        const top = section.offsetTop - 110;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <a href={href || "#"} onClick={handleClick} className="inline-block">
      <button aria-label={text} className={`btn ${variant === "accent" ? "btn-accent" : "btn-ghost"}`}>
        <span className="flex items-center gap-2 text-sm">
          <span>{text}</span>
          <Icon className={`w-4 h-4 ${variant === "accent" ? "text-[#0c0d11]" : "text-gray-200"}`} />
        </span>
      </button>
    </a>
  );
});

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="relative p-3 group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative flex items-center justify-center p-2 transition-all duration-300 border rounded-xl bg-black/50 backdrop-blur-xl border-white/10 group-hover:border-white/20">
        <Icon className="w-5 h-5 text-gray-400 transition-colors group-hover:text-white" />
      </div>
    </button>
  </a>
));

const TRACK_LINES = [
  { variant: "red", top: "20%", left: "-40%", width: "180%", delay: "0s", duration: "8s", rotation: "-8deg", travel: "200%" },
  { variant: "blue", top: "32%", left: "-30%", width: "170%", delay: "1.2s", duration: "7.5s", rotation: "-5deg", travel: "210%" },
  { variant: "red", top: "46%", left: "-45%", width: "190%", delay: "2.4s", duration: "8.6s", rotation: "-2deg", travel: "205%" },
  { variant: "blue", top: "60%", left: "-38%", width: "175%", delay: "3.4s", duration: "7.8s", rotation: "1deg", travel: "215%" },
  { variant: "red", top: "68%", left: "-28%", width: "160%", delay: "4.6s", duration: "8.4s", rotation: "4deg", travel: "210%" },
  { variant: "blue", top: "78%", left: "-35%", width: "185%", delay: "5.8s", duration: "8.8s", rotation: "8deg", travel: "220%" }
];

const TrackLines = memo(() => (
  <div className="home-track-lines" aria-hidden>
    {TRACK_LINES.map((line, index) => (
      <span
        key={index}
        className={`home-track-line home-track-line--${line.variant}`}
        style={{
          top: line.top,
          left: line.left,
          width: line.width,
          animationDelay: line.delay,
          animationDuration: line.duration,
          "--line-rotation": line.rotation,
          "--line-travel": line.travel
        }}
      />
    ))}
  </div>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Software Engineer","Fullstack Developer", "Mobile App Developer", "Web Developer","AI Engineering (Beginner Level)"];
const TECH_STACK = ["React", "JavaScript", "Node.js","Flutter","Three.js"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/SandaluThisanka" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/sandalu-thisanka-719564334/" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://assets-v2.lottiefiles.com/a/632817ec-116f-11ee-aef7-1b7251f21382/9CPeklPKPM.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full flex items-center justify-center transition-transform duration-500 ${
      isHovering 
        ? "scale-[115%] rotate-2" 
        : "scale-[110%]"
    }`
  };

  return (
    <div className="relative min-h-screen bg-[#05060c] overflow-hidden" id="Home">
      <div className="glow-orb w-[420px] h-[420px] top-[-160px] left-[8%]" aria-hidden />
      <div className="glow-orb w-[520px] h-[520px] bottom-[-180px] right-[-120px]" style={{ background: "radial-gradient(circle at center, rgba(246,197,0,0.45) 0%, rgba(37,99,235,0.25) 45%, transparent 75%)" }} aria-hidden />
      <div className="neon-trail neon-trail--blue top-[-10%] left-[12%] h-[120%]" style={{ animationDelay: "0.5s" }} aria-hidden />
      <div className="neon-trail neon-trail--rose top-[-15%] right-[18%] h-[130%]" style={{ animationDelay: "1.8s" }} aria-hidden />
      <div className="neon-trail neon-trail--amber top-[-18%] left-1/2 h-[140%]" style={{ animationDelay: "3s" }} aria-hidden />
      <TrackLines />

      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="min-h-screen pt-24 section-shell">
          <div className="flex flex-col items-center justify-center h-screen gap-0 lg:flex-row md:justify-between sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="order-1 w-full space-y-6 text-left lg:w-1/2 sm:space-y-8 lg:text-left lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="flex items-center h-8" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl gradient-title font-light uppercase tracking-[0.18em]">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#f6c500] via-[#fb923c] to-[#38bdf8] ml-2 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="max-w-xl text-base font-light leading-relaxed md:text-lg text-slate-300"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  I am passionate about delivering high-quality software that exceeds expectations.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap justify-start gap-3" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row justify-start w-full gap-3" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} variant="accent" />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} variant="ghost" />
                </div>

                {/* Social Links */}
                <div className="justify-start hidden gap-4 sm:flex" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div className="w-full lg:w-1/2 min-h-[320px] h-full lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600">
              <div className="relative w-full max-w-[420px] aspect-square opacity-90 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#f6c500]/12 via-[#fb923c]/10 to-[#38bdf8]/12 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                  isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                }`}>
                </div>

                <div className={`relative z-10 w-full h-full opacity-90 transform transition-transform duration-500 flex items-center justify-center ${
                  isHovering ? "scale-105" : "scale-100"
                }`}>
                  <DotLottieReact {...lottieOptions} />
                </div>

                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                  isHovering ? "opacity-50" : "opacity-20"
                }`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#38bdf8]/20 via-[#f6c500]/12 to-transparent blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);