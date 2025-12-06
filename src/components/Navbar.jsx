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
            setScrolled(window.scrollY > 20);
            const sections = navItems
                .map((item) => {
                    const section = document.querySelector(item.href);
                    if (section) {
                        return {
                            id: item.href.replace("#", ""),
                            offset: section.offsetTop - 550,
                            height: section.offsetHeight,
                        };
                    }
                    return null;
                })
                .filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(
                (section) =>
                    currentPosition >= section.offset &&
                    currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    const scrollToSection = (event, href) => {
        event.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setIsOpen(false);
    };

    const isActive = (href) => activeSection === href.substring(1);

    return (
        <nav className="fixed top-0 z-50 w-full">
            <div className="px-4 sm:px-6 lg:px-[8%] pt-4">
                <div className={`nav-shell w-full ${scrolled || isOpen ? "nav-shell--solid" : ""}`}>
                    <a
                        href="#Home"
                        onClick={(event) => scrollToSection(event, "#Home")}
                        className="nav-brand"
                    >
                        <span className="text-[rgba(250,204,21,0.88)]">Sandalu</span>
                        <span>Thisanka</span>
                    </a>

                    <div className="items-center hidden gap-6 md:flex lg:gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(event) => scrollToSection(event, item.href)}
                                className={`nav-link ${isActive(item.href) ? "nav-link--active" : ""}`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <a
                        href="#Contact"
                        onClick={(event) => scrollToSection(event, "#Contact")}
                        className="hidden btn-futuristic md:inline-flex"
                    >
                        <span>Book A Slot</span>
                        <span aria-hidden="true">›</span>
                    </a>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            className={`flex items-center justify-center w-11 h-11 rounded-md border border-[rgba(250,204,21,0.3)] bg-[rgba(12,13,30,0.85)] text-[rgba(250,204,21,0.85)] shadow-[0_12px_24px_rgba(6,9,26,0.45)] transition-all duration-300 ${
                                isOpen ? "scale-110 rotate-90" : "hover:-translate-y-0.5"
                            }`}
                            aria-label={isOpen ? "Close navigation" : "Open navigation"}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden fixed inset-0 z-40 bg-[rgba(6,8,22,0.92)] backdrop-blur-2xl transition-all duration-300 ${
                    isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-3 opacity-0 pointer-events-none"
                }`}
            >
                <div className="pt-[calc(4rem+2.75rem)] px-6 space-y-4">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(event) => scrollToSection(event, item.href)}
                            className={`nav-link nav-link--mobile ${isActive(item.href) ? "nav-link--active" : ""}`}
                            style={{ transitionDelay: `${index * 60}ms` }}
                        >
                            <span>{item.label}</span>
                            <span className="text-[0.55rem] tracking-[0.4em] text-[rgba(250,204,21,0.8)]">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;