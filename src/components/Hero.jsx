import { useMemo, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

function normalizeSources(videoSrc, videoSources) {
  if (videoSources.length > 0) {
    return videoSources.map((source) =>
      typeof source === "string" ? { src: source } : source
    );
  }

  if (!videoSrc) {
    return [];
  }

  return [{ src: videoSrc }];
}

export default function Hero({ videoSrc = "", videoSources = [] }) {
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const { isDarkTheme } = useTheme();
  const { t } = useLanguage();
  const sources = useMemo(() => normalizeSources(videoSrc, videoSources), [videoSrc, videoSources]);
  const activeSource = sources[0];

  const metrics = [
    { label: t("Proyectos activos", "Active projects"), value: "09" },
    { label: t("m2 construidos", "Built sqm"), value: "28k" },
    { label: t("Ciudades", "Cities"), value: "06" }
  ];

  return (
    <section className="relative border-b border-[color:var(--as-border)] pt-28">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:px-8">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Estudio Norte", "North Studio")}
          </p>
          <h1 className="font-['Space_Grotesk'] text-5xl leading-[0.94] text-[var(--as-text)] sm:text-6xl">
            {t(
              "Arquitectura precisa para vida contemporanea",
              "Precise architecture for contemporary living"
            )}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
            {t(
              "Diseno integral de vivienda, interiorismo y equipamientos con enfoque funcional, materialidad durable y relacion clara con el contexto.",
              "Integrated design for housing, interiors, and facilities with a clear focus on function, durable materials, and context."
            )}
          </p>

          <div className="grid grid-cols-3 gap-3">
            {metrics.map((item) => (
              <article
                key={item.label}
                className="border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] px-3 py-4"
              >
                <p className="font-['Space_Grotesk'] text-2xl text-[var(--as-text)]">{item.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden border border-[color:var(--as-border-strong)] bg-[var(--as-panel)]">
          <div className="pointer-events-none absolute left-5 top-5 z-20 h-8 w-8 border-l border-t border-white/70" />
          <div className="pointer-events-none absolute bottom-5 right-5 z-20 h-8 w-8 border-b border-r border-white/70" />

          <div className="relative aspect-[16/10] w-full overflow-hidden">
            {activeSource && !hasVideoError ? (
              <video
                key={activeSource.src}
                className={`h-full w-full object-cover transition duration-700 ease-out ${
                  isVideoReady ? "opacity-100" : "scale-[1.02] opacity-60"
                }`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setIsVideoReady(true)}
                onError={() => setHasVideoError(true)}
              >
                <source src={activeSource.src} type="video/mp4" />
              </video>
            ) : (
              <div className="h-full w-full bg-[linear-gradient(135deg,#7b8d95_0%,#58666f_52%,#2f3940_100%)]" />
            )}

            <div
              className={`absolute inset-0 ${
                isDarkTheme
                  ? "bg-gradient-to-b from-black/16 via-transparent to-black/45"
                  : "bg-gradient-to-b from-white/10 via-transparent to-black/28"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
