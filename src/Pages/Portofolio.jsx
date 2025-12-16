import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import projectsData from "../data/projects.json";
import certificatesData from "../data/certificates.json";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f6c500]/60 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const devIcon = (path) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

const techStacks = [
  { icon: devIcon("python/python-original.svg"), language: "Python", category: "Backend" },
  { icon: devIcon("java/java-original.svg"), language: "Java", category: "Backend" },
  { icon: devIcon("spring/spring-original.svg"), language: "Spring Boot", category: "Backend" },
  { icon: devIcon("php/php-original.svg"), language: "PHP", category: "Backend" },
  { icon: devIcon("csharp/csharp-original.svg"), language: "C#", category: "Backend" },
  { icon: devIcon("flutter/flutter-original.svg"), language: "Flutter", category: "Mobile" },
  { icon: devIcon("kotlin/kotlin-original.svg"), language: "Kotlin", category: "Mobile" },
  { icon: devIcon("html5/html5-original.svg"), language: "HTML", category: "Frontend" },
  { icon: devIcon("css3/css3-original.svg"), language: "CSS", category: "Frontend" },
  { icon: devIcon("javascript/javascript-original.svg"), language: "JavaScript", category: "Frontend" },
  { icon: devIcon("tailwindcss/tailwindcss-original.svg"), language: "Tailwind CSS", category: "Frontend" },
  { icon: devIcon("react/react-original.svg"), language: "ReactJS", category: "Frontend" },
  { icon: devIcon("vitejs/vitejs-original.svg"), language: "Vite", category: "Frontend" },
  { icon: devIcon("nextjs/nextjs-original-wordmark.svg"), language: "Next.js", category: "Frontend" },
  { icon: devIcon("jquery/jquery-original.svg"), language: "jQuery", category: "Frontend" },
  { icon: devIcon("nodejs/nodejs-original.svg"), language: "Node JS", category: "Backend" },
  { icon: devIcon("bootstrap/bootstrap-original.svg"), language: "Bootstrap", category: "Frontend" },
  { icon: devIcon("mysql/mysql-original.svg"), language: "MySQL", category: "Database" },
  { icon: devIcon("firebase/firebase-plain.svg"), language: "Firebase", category: "Database" },
  { icon: devIcon("microsoftsqlserver/microsoftsqlserver-plain.svg"), language: "SQL Server", category: "Database" },
  { icon: devIcon("supabase/supabase-original.svg"), language: "Supabase", category: "Database" },
  { icon: devIcon("oracle/oracle-original.svg"), language: "OracleDB", category: "Database" },
  { icon: devIcon("mongodb/mongodb-original.svg"), language: "MongoDB", category: "Database" },
  { icon: devIcon("git/git-original.svg"), language: "Git", category: "Others" },
  { icon: devIcon("github/github-original.svg"), language: "GitHub", category: "Others" },
  { icon: devIcon("docker/docker-original.svg"), language: "Docker", category: "Others" },
  { icon: devIcon("amazonwebservices/amazonwebservices-original.svg"), language: "AWS", category: "Others" },
  { icon: devIcon("azure/azure-original.svg"), language: "Azure", category: "Others" },
  { icon: devIcon("netlify/netlify-original.svg"), language: "Netlify", category: "Others" },
  { icon: devIcon("figma/figma-original.svg"), language: "Figma", category: "Others" },
  { icon: devIcon("postman/postman-original.svg"), language: "Postman", category: "Others" },
  { icon: devIcon("discordjs/discordjs-original.svg"), language: "Discord", category: "Others" },
  { icon: devIcon("stackoverflow/stackoverflow-original.svg"), language: "Stack Overflow", category: "Others" },
];
const categories = ["Frontend", "Backend", "Mobile", "Database", "Others"];

export default function FullWidthTabs() {
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  useEffect(() => {
    setProjects(projectsData);
    setCertificates(certificatesData);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const filteredTechStacks = techStacks.filter(
    (stack) => stack.category === selectedCategory
  );

  return (
    <div className="section-shell w-full relative bg-[#05060c] overflow-hidden" id="Portofolio">
      <div className="glow-orb w-[320px] h-[320px] top-[-120px] right-[6%]" aria-hidden />
      <div className="glow-orb w-[420px] h-[420px] bottom-[-160px] left-[-80px]" style={{ background: "radial-gradient(circle at center, rgba(246,197,0,0.4) 0%, rgba(56,189,248,0.25) 45%, transparent 70%)" }} aria-hidden />
      <div className="neon-trail neon-trail--blue top-[-20%] left-[22%] h-[140%]" style={{ animationDelay: "1s" }} aria-hidden />
      <div className="neon-trail neon-trail--amber top-[-18%] right-[18%] h-[120%]" style={{ animationDelay: "2.6s" }} aria-hidden />

      <div className="relative z-10">
        <div className="pb-10 text-center" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8]">
            <span
              style={{
                color: "#f6c500",
                backgroundImage: "linear-gradient(120deg, #f6c500 0%, #fb923c 50%, #38bdf8 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Portfolio Showcase
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mt-2 text-sm text-slate-300 md:text-base">
            Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(246, 197, 0, 0.06) 0%, rgba(56, 189, 248, 0.08) 100%)",
                backdropFilter: "blur(10px)",
                zIndex: 0,
              },
            }}
            className="md:px-4"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              variant="fullWidth"
              sx={{
                minHeight: "70px",
                "& .MuiTab-root": {
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: "600",
                  color: "#94a3b8",
                  textTransform: "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: "20px 0",
                  zIndex: 1,
                  margin: "8px",
                  borderRadius: "12px",
                  "&:hover": {
                    color: "#ffffff",
                    backgroundColor: "rgba(246, 197, 0, 0.12)",
                    transform: "translateY(-2px)",
                    "& .lucide": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                  "&.Mui-selected": {
                    color: "#fff",
                    background: "linear-gradient(135deg, rgba(246, 197, 0, 0.25), rgba(56, 189, 248, 0.25))",
                    boxShadow: "0 4px 15px -3px rgba(246, 197, 0, 0.25)",
                    "& .lucide": {
                      color: "#f6c500",
                    },
                  },
                },
                "& .MuiTabs-indicator": {
                  height: 0,
                },
                "& .MuiTabs-flexContainer": {
                  gap: "8px",
                },
              }}
            >
              <Tab
                icon={<Code className="w-5 h-5 mb-2 transition-all duration-300" />}
                label="Projects"
                {...a11yProps(0)}
              />
              <Tab
                icon={<Award className="w-5 h-5 mb-2 transition-all duration-300" />}
                label="Certificates"
                {...a11yProps(1)}
              />
              <Tab
                icon={<Boxes className="w-5 h-5 mb-2 transition-all duration-300" />}
                label="Tech Stack"
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>

          <div>
            <TabPanel value={value} index={0}>
              <div className="container flex items-center justify-center mx-auto overflow-hidden">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
                  {displayedProjects.map((project, index) => (
                    <div
                      key={project.id || index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <CardProject
                        Img={project.Img}
                        Title={project.Title}
                        Description={project.Description}
                        Link={project.Link}
                        id={project.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {projects.length > initialItems && (
                <div className="flex justify-start w-full mt-6">
                  <ToggleButton
                    onClick={() => toggleShowMore('projects')}
                    isShowingMore={showAllProjects}
                  />
                </div>
              )}
            </TabPanel>

            <TabPanel value={value} index={1}>
              <div className="container flex items-center justify-center mx-auto overflow-hidden">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
                  {displayedCertificates.map((certificate, index) => (
                    <div
                      key={index}
                      data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <Certificate ImgSertif={certificate.Img} />
                    </div>
                  ))}
                </div>
              </div>
              {certificates.length > initialItems && (
                <div className="flex justify-start w-full mt-6">
                  <ToggleButton
                    onClick={() => toggleShowMore('certificates')}
                    isShowingMore={showAllCertificates}
                  />
                </div>
              )}
            </TabPanel>

            <TabPanel value={value} index={2}>
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                      px-4 py-2 rounded-md
                      ${
                        selectedCategory === cat
                          ? "bg-[#f6c500] text-[#0c0d11] shadow-[0_0_20px_rgba(246,197,0,0.25)]"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6 lg:gap-8">
                  {filteredTechStacks.map((stack, index) => (
                    <div
                      key={index}
                      data-aos={
                        index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"
                      }
                      data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                      <TechStackIcon
                        TechStackIcon={stack.icon}
                        Language={stack.language}
                        showIcon={true}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </div>
        </Box>
      </div>
    </div>
  );
}