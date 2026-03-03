import { Link, useParams } from "react-router-dom";
import { getMethodSections } from "../data/methodSections";
import { useLanguage } from "../hooks/useLanguage";

export default function MetodoCreativoDetailPage() {
  const { language, t } = useLanguage();
  const methodSections = getMethodSections(language);
  const { sectionId } = useParams();
  const section = methodSections.find((item) => item.id === sectionId);

  if (!section) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-28 sm:px-6">
        <h1 className="font-['Space_Grotesk'] text-5xl text-[var(--as-text)]">
          {t("Seccion no encontrada", "Section not found")}
        </h1>
        <Link
          to="/proceso-estudio"
          className="mt-6 inline-block rounded-lg border border-[color:var(--as-border-strong)] px-5 py-2 text-xs uppercase tracking-[0.12em] text-[var(--as-text)]"
        >
          {t("Volver al Proceso de Estudio", "Back to Studio Process")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <Link
        to="/proceso-estudio"
        className="text-[11px] uppercase tracking-[0.14em] text-[var(--as-text-soft)]"
      >
        {t("Proceso de Estudio", "Studio Process")}
      </Link>

      <h1 className="mt-4 font-['Space_Grotesk'] text-6xl leading-[0.92] text-[var(--as-text)]">
        {section.title}
      </h1>
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--as-text-muted)]">
        {section.brief}
      </p>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <article className="overflow-hidden border border-[color:var(--as-border)] bg-[var(--as-glass-soft)]">
          <div className="h-80 bg-[var(--as-panel)]">
            {section.image ? (
              <img
                src={section.image}
                alt={section.title}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-[#4d535f] to-[#22262e]" />
            )}
          </div>
        </article>

        <article className="border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] p-6">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Resumen", "Summary")}
          </p>
          <ul className="mt-4 space-y-3">
            {section.highlights.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-[var(--as-text-muted)]">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

