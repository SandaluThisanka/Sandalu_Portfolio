import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");

    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 16);

            const sections = navItems
                .map((item) => {
                    const section = document.querySelector(item.href);
                    if (!section) return null;
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 220,
                        height: section.offsetHeight,
                    };
                })
                .filter(Boolean);

            const current = window.scrollY;
            const active = sections.find(
                (s) => current >= s.offset && current < s.offset + s.height
            );

            if (active) setActiveSection(active.id);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e?.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 110;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 nav-surface ${scrolled ? "shadow-2xl" : "opacity-95"} relative`}>
            <div className="nav-hex-grid" aria-hidden />
            <div className="nav-scanline" aria-hidden />

            <div className="max-w-7xl mx-auto px-[5%] lg:px-[7%]">
                <div className="nav-inner">
                    <a
                        href="#Home"
                        onClick={(e) => scrollToSection(e, "#Home")}
                        className="nav-brand nav-plate"
                    >
                        <span className="nav-brand-mark" />
                        <div className="leading-tight">
                            <span className="nav-brand-text">SANDALU THISANKA</span>
                            <span className="nav-brand-sub">PORTFOLIO</span>
                        </div>
                    </a>

                    <div className="hidden md:flex items-center gap-6">
                        <div className="nav-links-plate">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={`nav-link ${activeSection === item.href.substring(1) ? "is-active" : ""}`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
                            <div className="nav-status">
                                <span className="nav-status-dot" aria-hidden />
                                <span className="nav-status-label">System Online</span>
                            </div>
                            <span className="nav-divider" aria-hidden />
                            <span className="nav-motto">
                                <span className="nav-motto-glow" aria-hidden />
                                Crafting Immersive Experiences
                            </span>
                        </div>
                    </div>

                    <div className="hidden md:flex lg:hidden">
                        <span className="nav-motto w-full justify-end">
                            <span className="nav-motto-glow" aria-hidden />
                            Crafting Immersive Experiences
                        </span>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#f6c500] hover:text-white transition-transform duration-300 ease-in-out transform ${isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"}`}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden fixed inset-0 bg-[#0f1017] transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                }`}
                style={{ top: "74px" }}
            >
                <div className="flex flex-col h-full">
                    <div className="px-[5%] py-6 space-y-3 flex-1">
                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className={`block px-5 py-3 text-base font-display tracking-[0.08em] uppercase rounded-lg transition-all duration-300 ease ${
                                    activeSection === item.href.substring(1)
                                        ? "bg-[#f6c500]/15 text-white border border-[#f6c500]/30"
                                        : "text-[#f2f2f7] bg-white/5 hover:bg-white/10 border border-white/5"
                                }`}
                                style={{ transitionDelay: `${index * 90}ms`, transform: isOpen ? "translateX(0)" : "translateX(40px)", opacity: isOpen ? 1 : 0 }}
                            >
                                {item.label}
                            </a>
                        ))}

                        <div className="mt-auto pt-4 space-y-3">
                            <div className="nav-status nav-status--mobile">
                                <span className="nav-status-dot" aria-hidden />
                                <span className="nav-status-label">System Online</span>
                            </div>
                            <p className="text-xs uppercase tracking-[0.16em] text-[#f6c500] font-display">
                                Crafting Immersive Experiences
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;