import { useState } from "react";
import { studioImages } from "../data/media";
import { useLanguage } from "../hooks/useLanguage";

const mosaicPattern = [
  "lg:col-span-7 lg:row-span-3",
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-7 lg:row-span-3",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2"
];

export default function ImagesPage() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  const galleryNotes = [
    {
      es: "Planteo de fachada con control solar y estructura expuesta.",
      en: "Facade strategy with solar control and exposed structure."
    },
    {
      es: "Resolucion interior con circulacion abierta y luz cenital.",
      en: "Interior layout with open circulation and zenithal daylight."
    },
    {
      es: "Detalle de materialidad en encuentro de hormigon y madera.",
      en: "Material detail at concrete and timber intersection."
    },
    {
      es: "Maqueta de implantacion para lectura de escala urbana.",
      en: "Site model used for urban scale reading."
    },
    {
      es: "Sistema modular para montaje en seco y mantenimiento simple.",
      en: "Modular system for dry assembly and simple maintenance."
    },
    {
      es: "Estudio de atmosfera interior con iluminacion indirecta.",
      en: "Interior atmosphere study with indirect lighting."
    },
    {
      es: "Visualizacion de acceso principal y secuencia de ingreso.",
      en: "Main access visualization and arrival sequence."
    }
  ];

  const details = studioImages.map((image, index) => {
    const note = galleryNotes[index % galleryNotes.length];
    return {
      image,
      title: `${t("Obra", "Work")} ${String(index + 1).padStart(2, "0")}`,
      subtitle: t("Proyecto en desarrollo", "Project in progress"),
      text: language === "en" ? note.en : note.es
    };
  });

  const activeItem = activeIndex !== null ? details[activeIndex] : null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Galeria", "Gallery")}
          </p>
          <h1 className="mt-2 font-['Space_Grotesk'] text-5xl leading-[0.95] text-[var(--as-text)] sm:text-6xl">
            {t("Archivo Visual", "Visual Archive")}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
          {t(
            "Seleccion de obra, detalles de materialidad, maquetas y visualizaciones del estudio en distintos contextos.",
            "Selection of built work, material details, models, and visualizations across different contexts."
          )}
        </p>
      </header>

      <section className="grid auto-rows-[150px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {details.map((item, index) => (
          <button
            key={`${item.image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative overflow-hidden border border-[color:var(--as-border)] bg-[var(--as-panel)] text-left ${mosaicPattern[index % mosaicPattern.length]}`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
            <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.12em] text-white opacity-0 transition duration-300 group-hover:opacity-100">
              {t("Abrir", "Open")}
            </p>
          </button>
        ))}
      </section>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="w-full max-w-6xl overflow-hidden border border-white/20 bg-[var(--as-glass)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="h-[320px] md:h-[560px]">
                <img src={activeItem.image} alt={activeItem.title} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col justify-between border-l border-[color:var(--as-border)] p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                    {activeItem.subtitle}
                  </p>
                  <h2 className="mt-2 font-['Space_Grotesk'] text-4xl leading-[0.96] text-[var(--as-text)]">
                    {activeItem.title}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--as-text-muted)]">
                    {activeItem.text}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveIndex(null)}
                  className="mt-6 inline-flex w-fit border border-[color:var(--as-border-strong)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--as-text)] transition hover:bg-[var(--as-inverse-bg)] hover:text-[var(--as-inverse-text)]"
                >
                  {t("Cerrar", "Close")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

