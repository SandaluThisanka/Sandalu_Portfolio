import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
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
      bg-[rgba(250,204,21,0.08)] 
      hover:bg-[rgba(250,204,21,0.14)]
      rounded-md
      border 
      border-[rgba(250,204,21,0.25)]
      hover:border-[rgba(250,204,21,0.4)]
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
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[rgba(250,204,21,0.5)] transition-all duration-300 group-hover:w-full"></span>
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

const techStacks = [
  { icon: "python.svg", language: "Python", category: "Backend" },
  { icon: "java.svg", language: "Java", category: "Backend" },
  { icon: "spring.svg", language: "Spring Boot", category: "Backend" },
  { icon: "php.svg", language: "PHP", category: "Backend" },
  { icon: "csharp.svg", language: "C#", category: "Backend" },
  { icon: "flutter.svg", language: "Flutter", category: "Mobile" },
  { icon: "html.svg", language: "HTML", category: "Frontend" },
  { icon: "css.svg", language: "CSS", category: "Frontend" },
  { icon: "javascript.svg", language: "JavaScript", category: "Frontend" },
  { icon: "tailwind.svg", language: "Tailwind CSS", category: "Frontend" },
  { icon: "reactjs.svg", language: "ReactJS", category: "Frontend" },
  { icon: "vite.svg", language: "Vite", category: "Frontend" },
  { icon: "nextjs.png", language: "Next.js", category: "Frontend" },
  { icon: "jquery.png", language: "jQuery", category: "Frontend" },
  { icon: "nodejs.svg", language: "Node JS", category: "Backend" },
  { icon: "bootstrap.svg", language: "Bootstrap", category: "Frontend" },
  { icon: "mysql.svg", language: "MySQL", category: "Database" },
  { icon: "firebase.svg", language: "Firebase", category: "Database" },
  { icon: "sqlserver.svg", language: "SQL Server", category: "Database" },
  { icon: "supabase.png", language: "Supabase", category: "Database" },
  { icon: "oracledb.png", language: "OracleDB", category: "Database" },
  { icon: "mongodb.png", language: "MongoDB", category: "Database" },
  { icon: "git.png", language: "Git", category: "Others" },
  { icon: "github.png", language: "GitHub", category: "Others" },
  { icon: "docker.png", language: "Docker", category: "Others" },
  { icon: "aws.png", language: "AWS", category: "Others" },
  { icon: "azure.png", language: "Azure", category: "Others" },
  { icon: "netlify.png", language: "Netlify", category: "Others" },
  { icon: "figma.png", language: "Figma", category: "Others" },
  { icon: "postman.png", language: "Postman", category: "Others" },
  { icon: "discord.png", language: "Discord", category: "Others" },
  { icon: "stackoverflow.png", language: "Stackoverflow", category: "Others" },
];
const categories = ["Frontend", "Backend", "Mobile", "Database", "Others"];

export default function FullWidthTabs() {
  const theme = useTheme();
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
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const filteredTechStacks = techStacks.filter(
    (stack) => stack.category === selectedCategory
  );

  return (
    <div className="page-section md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] overflow-hidden" id="Portofolio">
      <div className="section-glow -top-36 left-[-12%]" />
      <div className="section-glow section-glow--pink bottom-[-14rem] right-[-10%]" />
      <div className="section-content">
        {/* Header section - unchanged */}
        <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
          <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto accent-heading">
            <span
              style={{
                color: '#facc15',
                backgroundImage: 'linear-gradient(45deg, #facc15 10%, #fbbf24 93%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Portfolio Showcase
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Explore my journey through projects, certifications, and technical expertise. 
            Each section represents a milestone in my continuous learning path.
          </p>
        </div>

        <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
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
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4 glow-card"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              // Existing styles remain unchanged
              minHeight: "70px",
              "& .MuiTab-root": {
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  fontWeight: "600",
                  color: "rgba(255, 250, 209, 0.6)",
                  textTransform: "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  padding: "20px 0",
                  zIndex: 1,
                  margin: "8px",
                  borderRadius: "12px",
                  "&:hover": {
                    color: "#fef9c3",
                    backgroundColor: "rgba(250, 204, 21, 0.12)",
                    transform: "translateY(-2px)",
                    "& .lucide": {
                      transform: "scale(1.1) rotate(5deg)",
                      color: "#facc15",
                    },
                  },
                  "&.Mui-selected": {
                    color: "#fefce8",
                    background: "linear-gradient(135deg, rgba(250, 204, 21, 0.22), rgba(251, 191, 36, 0.2))",
                    boxShadow: "0 4px 15px -3px rgba(250, 204, 21, 0.28)",
                    "& .lucide": {
                      color: "#facc15",
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
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
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
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
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
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-4 justify-center items-center gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-4 py-2 rounded-md
                    ${
                      selectedCategory === cat
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-slate-300"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtered Tech Stacks */}
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
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
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
        </Box>
      </div>
    </div>
  );
}