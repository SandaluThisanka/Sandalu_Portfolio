import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import NeonTrails from "../components/NeonTrails"

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-soft-bounce lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] rounded-full blur opacity-30 group-hover:opacity-55 transition duration-1000"></div>
        <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-[rgba(250,204,21,0.32)]">
          <span className="accent-subheading sm:text-sm text-[0.7rem] font-medium flex items-center">
            <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-[rgba(250,204,21,0.88)]" />
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
        <span className="absolute -inset-2 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] blur-2xl opacity-30"></span>
         <span className="relative accent-heading">
          Fullstack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] blur-2xl opacity-30"></span>
         <span className="relative accent-heading">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="hidden glass-chip sm:block">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, variant = "solid" }) => (
  <a
    href={href}
    className={`${variant === "solid" ? "btn-futuristic" : "btn-outline-futuristic"} group`}
  >
    <span>{text}</span>
    {Icon ? (
      <Icon
        className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${
          variant === "solid" ? "text-[rgba(12,13,24,0.85)]" : "text-slate-200"
        }`}
      />
    ) : null}
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="relative p-3 group">
      <div className="absolute inset-0 bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] rounded-xl blur opacity-20 group-hover:opacity-45 transition duration-300"></div>
      <div className="relative flex items-center justify-center p-2 transition-all duration-300 border rounded-xl bg-black/50 backdrop-blur-xl border-[rgba(250,204,21,0.25)] group-hover:border-[rgba(250,204,21,0.45)]">
        <Icon className="w-5 h-5 text-stone-200 transition-colors group-hover:text-white" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["FrontEnd Developer", "BackEnd Developer"];
const TECH_STACK = ["React", "Javascript", "Node.js", "Flutter"];
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
  return (
    <div className="min-h-screen overflow-hidden page-section" id="Home">
      <div className="section-glow -top-32 -left-24" />
      <div className="section-glow section-glow--blue bottom-[-18rem] right-[-10rem]" />
      <div className={`section-content z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
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
                  <span className="text-xl font-light text-transparent md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#facc15] to-[#f59e0b] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="max-w-xl text-base font-light leading-relaxed text-gray-400 md:text-lg"
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
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} variant="outline" />
                </div>

                {/* Social Links */}
                <div className="justify-start hidden gap-4 sm:flex" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Neon Track Illustration */}
            <div
              className="flex items-center justify-center order-2 w-full h-full mt-12 lg:w-1/2 lg:order-2 lg:mt-0"
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full max-w-[540px] xl:max-w-[620px]">
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#0b1028] via-[#0a0d24] to-[#111938] blur-3xl opacity-70"></div>
                <div className="relative rounded-[2.5rem] overflow-visible border border-white/5 shadow-[0_38px_60px_rgba(3,5,18,0.55)]">
                  <NeonTrails />
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