import { Link } from "react-router-dom";
import { getMethodSections } from "../data/methodSections";
import { useLanguage } from "../hooks/useLanguage";

export default function MetodoCreativoPage() {
  const { language, t } = useLanguage();
  const methodSections = getMethodSections(language);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Proceso de Estudio", "Studio Process")}
          </p>
          <h1 className="mt-2 font-['Space_Grotesk'] text-5xl leading-[0.95] text-[var(--as-text)] sm:text-6xl">
            {t("Metodologia", "Methodology")}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
          {t(
            "Secuencia de trabajo desde diagnostico inicial hasta documentacion tecnica y coordinacion final.",
            "Workflow sequence from initial diagnosis to technical documentation and final coordination."
          )}
        </p>
      </header>

      <section className="relative border-l border-[color:var(--as-border)] pl-6 sm:pl-8">
        {methodSections.map((section, index) => (
          <article key={section.id} className={`relative pb-10 ${index === methodSections.length - 1 ? "pb-0" : ""}`}>
            <span className="absolute -left-[2.1rem] top-1 inline-flex h-6 w-6 items-center justify-center border border-[color:var(--as-border-strong)] bg-[var(--as-glass)] text-[10px] font-semibold text-[var(--as-text)] sm:-left-[2.6rem]">
              {index + 1}
            </span>

            <div className="grid gap-5 border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] p-5 md:grid-cols-[0.8fr_1.2fr]">
              <div className="h-52 overflow-hidden border border-[color:var(--as-border)] bg-[var(--as-panel)]">
                {section.image ? (
                  <img
                    src={section.image}
                    alt={section.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#d6dce0] to-[#727b84]" />
                )}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                  {t("Etapa", "Stage")} {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-['Space_Grotesk'] text-4xl leading-[0.96] text-[var(--as-text)]">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--as-text-muted)]">
                  {section.brief}
                </p>
                <Link
                  to={`/proceso-estudio/${section.id}`}
                  className="mt-5 inline-block border border-[color:var(--as-border-strong)] px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-[var(--as-text)] transition hover:bg-[var(--as-inverse-bg)] hover:text-[var(--as-inverse-text)]"
                >
                  {t("Ver Seccion", "View Section")}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

