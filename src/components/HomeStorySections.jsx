import { Link } from "react-router-dom";
import { getStudioImage } from "../data/media";
import { useLanguage } from "../hooks/useLanguage";

export default function HomeStorySections() {
  const { t } = useLanguage();

  const storyBlocks = [
    {
      id: "identity",
      title: t("Proceso de Estudio", "Studio Process"),
      copy: t(
        "Cada proyecto inicia con analisis de sitio, programa y contexto urbano para definir una estrategia espacial solida.",
        "Each project starts with site, program, and urban context analysis to build a clear spatial strategy."
      ),
      visualLabel: t("Lamina 01", "Board 01"),
      image: getStudioImage(6) || getStudioImage(0),
      ctaLabel: t("Ver Proceso", "View Process"),
      ctaTo: "/proceso-estudio",
      gradient: "from-[#f0e8dc] via-[#deccb9] to-[#b89f8a]",
      reverse: false
    },
    {
      id: "direction",
      title: t("Obras y Visualizaciones", "Built Work and Visuals"),
      copy: t(
        "Documentamos obra, maquetas y renders para comunicar decisiones tecnicas, materialidad y atmosfera de cada espacio.",
        "We document construction, models, and renders to communicate technical decisions, materiality, and atmosphere."
      ),
      visualLabel: t("Lamina 02", "Board 02"),
      image: getStudioImage(7) || getStudioImage(1),
      ctaLabel: t("Ver Galeria", "View Gallery"),
      ctaTo: "/galeria",
      gradient: "from-[#42454f] via-[#2a2d35] to-[#16181d]",
      reverse: true
    }
  ];

  return (
    <section className="w-full border-t border-[color:var(--as-border)] bg-[var(--as-panel)]/35 px-4 py-10 sm:px-6 lg:px-8">
      {storyBlocks.map((block, index) => (
        <article
          key={block.id}
          className={`mx-auto grid w-full max-w-7xl gap-6 rounded-2xl border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] p-6 lg:grid-cols-2 lg:items-stretch ${index > 0 ? "mt-6" : ""}`}
        >
          <div className={`${block.reverse ? "order-2 lg:order-2" : "order-1 lg:order-1"}`}>
            <div className="flex h-full min-h-[18rem] items-end overflow-hidden rounded-xl">
              {block.image ? (
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={block.image}
                    alt={block.visualLabel}
                    className="h-full min-h-[18rem] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white">
                    {block.visualLabel}
                  </div>
                </div>
              ) : (
                <div className={`relative h-full w-full bg-gradient-to-br ${block.gradient}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(255,255,255,0.25),transparent_30%)]" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white">
                    {block.visualLabel}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className={`flex items-center ${block.reverse ? "order-1 lg:order-1" : "order-2 lg:order-2"}`}
          >
            <div className="w-full px-2 py-4 sm:px-4 lg:px-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--as-text-soft)]">
                {t("Estudio Norte", "North Studio")}
              </p>
              <h2 className="mt-3 font-['Space_Grotesk'] text-4xl leading-[0.98] text-[var(--as-text)] sm:text-5xl">
                {block.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[var(--as-text-muted)]">
                {block.copy}
              </p>
              <div className="mt-8">
                <Link
                  to={block.ctaTo}
                  className="inline-block rounded-lg border border-[color:var(--as-border-strong)] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[var(--as-text)] transition hover:bg-[var(--as-inverse-bg)] hover:text-[var(--as-inverse-text)]"
                >
                  {block.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

