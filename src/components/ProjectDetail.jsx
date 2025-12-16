import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ExternalLink, Github, Code2, Star,
  ChevronRight, Layers, Layout, Globe, Package, Cpu, Code,
} from "lucide-react";
import Swal from 'sweetalert2';
import projectsData from "../data/projects.json";


const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-[#f6c500]/10 via-[#fb923c]/10 to-[#38bdf8]/10 rounded-xl border border-[#f6c500]/15 hover:border-[#38bdf8]/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f6c500]/0 via-[#fb923c]/0 to-[#38bdf8]/0 group-hover:from-[#f6c500]/20 group-hover:to-[#38bdf8]/20 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#f6c500] group-hover:text-[#38bdf8] transition-colors" />
        <span className="text-xs md:text-sm font-medium text-[#f6c500]/80 group-hover:text-white transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[#f6c500]/20">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#f6c500]/20 via-[#fb923c]/20 to-[#38bdf8]/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-[#f6c500] to-[#38bdf8] group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm text-gray-300 transition-colors md:text-base group-hover:text-white">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0c0f1a] rounded-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f6c500]/15 via-[#fb923c]/15 to-[#38bdf8]/15 opacity-60 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-[#f6c500]/25 transition-all duration-300 hover:scale-105 hover:border-[#38bdf8]/40 hover:shadow-[0_12px_30px_rgba(246,197,0,0.25)]">
        <div className="bg-[#f6c500]/20 p-1.5 md:p-2 rounded-full">
          <Code2 className="text-[#f6c500] w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-[#fef08a]">{techStackCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Total Technologies</div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-[#38bdf8]/25 transition-all duration-300 hover:scale-105 hover:border-[#f6c500]/40 hover:shadow-[0_12px_30px_rgba(56,189,248,0.25)]">
        <div className="bg-[#38bdf8]/20 p-1.5 md:p-2 rounded-full">
          <Layers className="text-[#38bdf8] w-4 h-4 md:w-6 md:h-6" strokeWidth={1.5} />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-[#bae6fd]">{featuresCount}</div>
          <div className="text-[10px] md:text-xs text-gray-400">Main Features</div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === 'Private') {
    Swal.fire({
      icon: 'info',
      title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti',
      confirmButtonColor: '#f6c500',
      background: '#05060c',
      color: '#ffffff'
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const projectDetail = projectsData.find((proj) => String(proj.id) === id);
    
    if (projectDetail) {
      const enhancedProject = {
        ...projectDetail,
        Features: projectDetail.Features || [],
        TechStack: projectDetail.TechStack || [],
        Github: projectDetail.Github || 'https://github.com/Sahandulmith',
      };
      setProject(enhancedProject);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Project not found!',
      }).then(() => {
        navigate('/');
      });
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 mx-auto border-4 rounded-full md:w-24 md:h-24 border-blue-500/30 border-t-blue-500 animate-spin" />
          <h2 className="text-xl font-bold text-white md:text-3xl">Loading Project...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      {/* Background animations remain unchanged */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 bg-purple-500 rounded-full -left-4 w-72 md:w-96 h-72 md:h-96 mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 bg-blue-500 rounded-full -right-4 w-72 md:w-96 h-72 md:h-96 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bg-pink-500 rounded-full -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="relative">
        <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 md:py-16">
          <div className="flex items-center mb-8 space-x-2 md:space-x-4 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 transition-transform md:w-5 md:h-5 group-hover:-translate-x-1" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 text-sm md:space-x-2 md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="truncate text-white/90">{project.Title}</span>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 md:gap-16">
            <div className="space-y-6 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl font-bold leading-tight text-transparent md:text-6xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text">
                  {project.Title}
                </h1>
                <div className="relative w-16 h-1 md:w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm" />
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-base leading-relaxed md:text-lg text-gray-300/90">
                  {project.Description}
                </p>
              </div>

              <ProjectStats project={project} />

              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Action buttons */}
                <a
                  href={project.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink className="relative w-4 h-4 transition-transform md:w-5 md:h-5 group-hover:rotate-12" />
                  <span className="relative font-medium">Live Demo</span>
                </a>

                <a
                  href={project.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                >
                  <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github className="relative w-4 h-4 transition-transform md:w-5 md:h-5 group-hover:rotate-12" />
                  <span className="relative font-medium">Github</span>
                </a>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 className="w-4 h-4 text-blue-400 md:w-5 md:h-5" />
                  Technologies Used
                </h3>
                {project.TechStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 opacity-50 md:text-base">No technologies added.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="relative overflow-hidden border shadow-2xl rounded-2xl border-white/10 group">
              
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={project.Img}
                  alt={project.Title}
                  className="object-cover w-full transition-transform duration-700 transform will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 transition-colors duration-300 border-2 border-white/0 group-hover:border-white/10 rounded-2xl" />
              </div>

              {/* Fitur Utama */}
              <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-white/90">
                  <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                  Key Features
                </h3>
                {project.Features.length > 0 ? (
                  <ul className="space-y-2 list-none">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 opacity-50">No features added.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetails;