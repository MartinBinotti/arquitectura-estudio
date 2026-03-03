import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

function MenuIcon({ isOpen }) {
  return (
    <span className="relative inline-flex h-4 w-5 items-center justify-center">
      <span
        className={`absolute h-[2px] w-5 bg-current transition ${isOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px]"}`}
      />
      <span
        className={`absolute h-[2px] w-5 bg-current transition ${isOpen ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`absolute h-[2px] w-5 bg-current transition ${isOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px]"}`}
      />
    </span>
  );
}

const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 2.8v2.3M12 18.9v2.3M2.8 12h2.3M18.9 12h2.3M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
    <path
      d="M14.8 3.2a8.8 8.8 0 1 0 6 14.6A9.2 9.2 0 0 1 14.8 3.2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Navbar({ isOverlay = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { isDarkTheme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("INICIO", "HOME"), to: "/" },
    { label: t("PROYECTOS", "PROJECTS"), to: "/proyectos" },
    { label: t("GALERIA", "GALLERY"), to: "/galeria" },
    { label: t("PROCESO", "PROCESS"), to: "/proceso-estudio" },
    { label: t("CONTACTO", "CONTACT"), to: "/contacto" }
  ];

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isTransparent = isOverlay && !isScrolled && isDarkTheme;
  const navClassName = isTransparent
    ? "bg-transparent"
    : "border-b border-[color:var(--as-border)] bg-[color:var(--as-glass)] shadow-[0_6px_20px_rgba(16,21,22,0.05)]";

  const mainTextClass = isTransparent ? "text-white" : "text-[var(--as-text)]";
  const softTextClass = isTransparent
    ? "text-white/85 hover:text-white"
    : "text-[var(--as-text-muted)] hover:text-[var(--as-text)]";
  const controlClass = isTransparent
    ? "border-white/50 text-white hover:bg-white/10"
    : "border-[color:var(--as-border-strong)] text-[var(--as-text)] hover:bg-[var(--as-accent-soft)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navClassName}`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className={`font-['Space_Grotesk'] text-2xl font-semibold tracking-[0.08em] md:text-3xl ${mainTextClass}`}
        >
          ESTUDIO NORTE
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-[11px] uppercase tracking-[0.16em] transition ${
                    isActive ? mainTextClass : softTextClass
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            className={`hidden h-10 min-w-[3.2rem] items-center justify-center rounded-lg border px-2 text-xs font-semibold tracking-[0.1em] transition md:inline-flex ${controlClass}`}
            aria-label={t("Cambiar idioma", "Switch language")}
          >
            {language === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className={`hidden h-10 w-10 items-center justify-center rounded-lg border transition md:inline-flex ${controlClass}`}
            aria-label={
              isDarkTheme
                ? t("Cambiar a modo claro", "Switch to light mode")
                : t("Cambiar a modo oscuro", "Switch to dark mode")
            }
          >
            {isDarkTheme ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition md:hidden ${controlClass}`}
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={t("Abrir menu", "Toggle menu")}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div
          ref={menuRef}
          className="mx-3 mb-3 overflow-hidden rounded-xl border border-[color:var(--as-border-strong)] bg-[var(--as-glass)] shadow-glass md:hidden"
        >
          <div className="p-4">
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-[var(--as-text-soft)]">
              {t("Navegacion", "Navigation")}
            </p>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg border px-4 py-3 text-xs uppercase tracking-[0.14em] ${
                        isActive
                          ? "border-[color:var(--as-border-strong)] bg-[var(--as-panel)] text-[var(--as-text)]"
                          : "border-[color:var(--as-border)] text-[var(--as-text-muted)]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              <li>
                <button
                  type="button"
                  onClick={() => {
                    toggleLanguage();
                    setIsMenuOpen(false);
                  }}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-[color:var(--as-border)] px-4 py-3 text-xs uppercase tracking-[0.14em] text-[var(--as-text-muted)]"
                >
                  {language === "es" ? "English" : "Espanol"}
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[color:var(--as-border)] px-4 py-3 text-xs uppercase tracking-[0.14em] text-[var(--as-text-muted)]"
                >
                  {isDarkTheme ? <SunIcon /> : <MoonIcon />}
                  <span>
                    {isDarkTheme
                      ? t("Modo Claro", "Light Mode")
                      : t("Modo Oscuro", "Dark Mode")}
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </header>
  );
}

