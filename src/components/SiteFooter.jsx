import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function SiteFooter() {
  const { t } = useLanguage();

  const footerLinks = [
    { label: t("Inicio", "Home"), to: "/" },
    { label: t("Proyectos", "Projects"), to: "/proyectos" },
    { label: t("Galeria", "Gallery"), to: "/galeria" },
    { label: t("Proceso", "Process"), to: "/proceso-estudio" },
    { label: t("Contacto", "Contact"), to: "/contacto" }
  ];

  return (
    <footer className="relative mt-16 border-t border-[color:var(--as-border)] bg-[var(--as-glass)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative grid gap-10 pb-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            <p className="font-['Space_Grotesk'] text-4xl tracking-[0.04em] text-[var(--as-text)] sm:text-5xl">
              {t("Estudio Norte", "North Studio")}
            </p>
            <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
              {t(
                "Estudio de arquitectura contemporanea enfocado en vivienda, espacios comerciales y rehabilitacion integral.",
                "Contemporary architecture studio focused on housing, commercial spaces, and full rehabilitation."
              )}
            </p>
            <div className="inline-flex items-center gap-3 border border-[color:var(--as-border)] bg-[var(--as-panel)] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[var(--as-accent)]" />
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                {t("Disponibilidad para nuevos proyectos", "Available for new projects")}
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <nav>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
                {t("Navegacion", "Navigation")}
              </p>
              <ul className="mt-4 space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm uppercase tracking-[0.08em] text-[var(--as-text-muted)] transition hover:text-[var(--as-text)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
                {t("Contacto Directo", "Direct Contact")}
              </p>
              <p className="mt-4 text-sm text-[var(--as-text-muted)]">hola@estudionorte.arq</p>
              <p className="mt-2 text-sm text-[var(--as-text-muted)]">@estudionorte.arq</p>
              <Link
                to="/contacto"
                className="mt-5 inline-block border border-[color:var(--as-border-strong)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--as-text)] transition hover:bg-[var(--as-inverse-bg)] hover:text-[var(--as-inverse-text)]"
              >
                {t("Enviar Mensaje", "Send Message")}
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(to_right,transparent,var(--as-border-strong),transparent)]" />
        </div>

        <div className="pt-5 text-xs uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
          {t("Copyright 2026 Martin Augusto Binotti.", "Copyright 2026 Martin Augusto Binotti.")}
        </div>
      </div>
    </footer>
  );
}

