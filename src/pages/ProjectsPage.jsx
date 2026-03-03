import { useLanguage } from "../hooks/useLanguage";

export default function ProjectsPage() {
  const { language, t } = useLanguage();

  const projectNotes =
    language === "en"
      ? [
          {
            title: "North Patio House",
            status: "Concept Design",
            year: "2026",
            location: "Madrid",
            summary:
              "Single-family house with central patio, cross ventilation, and a hybrid concrete-timber system.",
            progress: "35%"
          },
          {
            title: "City Loft Retrofit",
            status: "Executive Project",
            year: "2026",
            location: "Barcelona",
            summary:
              "Full loft renovation with program redistribution, upgraded lighting, and fixed furniture strategy.",
            progress: "70%"
          },
          {
            title: "Modular Pavilion",
            status: "Tender Stage",
            year: "2027",
            location: "Valencia",
            summary:
              "Demountable cultural event system using prefabricated components and dry assembly.",
            progress: "52%"
          }
        ]
      : [
          {
            title: "Casa Patio Norte",
            status: "Anteproyecto",
            year: "2026",
            location: "Madrid",
            summary:
              "Vivienda unifamiliar con patio central, ventilacion cruzada y sistema mixto de hormigon y madera.",
            progress: "35%"
          },
          {
            title: "Reforma Loft Centro",
            status: "Proyecto Ejecutivo",
            year: "2026",
            location: "Barcelona",
            summary:
              "Actualizacion integral de un loft urbano con redistribucion de programa, iluminacion y mobiliario fijo.",
            progress: "70%"
          },
          {
            title: "Pabellon Modular",
            status: "Licitacion",
            year: "2027",
            location: "Valencia",
            summary:
              "Sistema desmontable para eventos culturales con piezas prefabricadas y montaje en seco.",
            progress: "52%"
          }
        ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Proyectos", "Projects")}
          </p>
          <h1 className="mt-2 font-['Space_Grotesk'] text-5xl leading-[0.95] text-[var(--as-text)] sm:text-6xl">
            {t("Pipeline del Estudio", "Studio Pipeline")}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
          {t(
            "Vista general de etapas activas, con seguimiento de avance y foco en coordinacion tecnica.",
            "Overview of active stages with progress tracking and technical coordination focus."
          )}
        </p>
      </header>

      <section className="space-y-5">
        {projectNotes.map((project, index) => (
          <article
            key={project.title}
            className="grid gap-6 border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] p-6 lg:grid-cols-[0.25fr_1fr_0.35fr] lg:items-center"
          >
            <div className="flex items-center gap-3 border-b border-[color:var(--as-border)] pb-4 lg:block lg:border-b-0 lg:pb-0">
              <span className="font-['Space_Grotesk'] text-3xl leading-none text-[var(--as-text)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                {project.status}
              </p>
            </div>

            <div>
              <h2 className="font-['Space_Grotesk'] text-3xl leading-[1] text-[var(--as-text)]">
                {project.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--as-text-muted)]">
                {project.summary}
              </p>
            </div>

            <div className="space-y-3 lg:justify-self-end lg:text-right">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                {project.location} | {project.year}
              </p>
              <p className="font-['Space_Grotesk'] text-2xl text-[var(--as-text)]">
                {project.progress}
              </p>
              <div className="h-1.5 w-full overflow-hidden bg-[var(--as-panel)] lg:w-44">
                <div
                  className="h-full bg-[var(--as-accent)]"
                  style={{ width: project.progress }}
                />
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

