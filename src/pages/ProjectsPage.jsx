import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects, fetchCategories } from "../services/api";
import { useLanguage } from "../hooks/useLanguage";

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const filters = activeCategory ? { category: activeCategory } : {};
    setLoading(true);
    setError(null);

    Promise.all([
      fetchProjects(filters),
      categories.length === 0 ? fetchCategories() : Promise.resolve(null)
    ])
      .then(([projectsData, categoriesData]) => {
        setProjects(projectsData);
        if (categoriesData) setCategories(categoriesData);
        setLoading(false);
      })
      .catch((err) => {
        setProjects([]);
        setError(err.message || t("No se pudo cargar el portfolio.", "Could not load the portfolio."));
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Proyectos", "Projects")}
          </p>
          <h1 className="mt-2 font-['Space_Grotesk'] text-5xl leading-[0.95] text-[var(--as-text)] sm:text-6xl">
            {t("Portfolio del Estudio", "Studio Portfolio")}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
          {t(
            "Seleccion de proyectos desarrollados por el estudio en distintas escalas y contextos.",
            "Selection of projects developed by the studio across different scales and contexts."
          )}
        </p>
      </header>

      {/* Category Filter */}
      {categories.length > 0 && (
        <nav className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition ${
              activeCategory === null
                ? "border-[color:var(--as-border-strong)] bg-[var(--as-inverse-bg)] text-[var(--as-inverse-text)]"
                : "border-[color:var(--as-border)] text-[var(--as-text-soft)] hover:border-[color:var(--as-border-strong)]"
            }`}
          >
            {t("Todos", "All")}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition ${
                activeCategory === cat.slug
                  ? "border-[color:var(--as-border-strong)] bg-[var(--as-inverse-bg)] text-[var(--as-inverse-text)]"
                  : "border-[color:var(--as-border)] text-[var(--as-text-soft)] hover:border-[color:var(--as-border-strong)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Cargando proyectos...", "Loading projects...")}
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex min-h-[30vh] flex-col items-center justify-center gap-3 text-center">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("No se pudo cargar el portfolio.", "Could not load the portfolio.")}
          </p>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
            {error}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && projects.length === 0 && (
        <div className="flex min-h-[30vh] items-center justify-center">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t(
              "No hay proyectos disponibles aun. Gestionalos desde el panel admin.",
              "No projects available yet. Manage them from the admin panel."
            )}
          </p>
        </div>
      )}

      {/* Project Grid */}
      {!loading && !error && projects.length > 0 && (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/proyecto/${project.slug}`}
              className="group border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] transition hover:border-[color:var(--as-border-strong)]"
            >
              {project.cover_image && (
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  {project.category && (
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                      {project.category.name}
                    </span>
                  )}
                  {project.year && (
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                      {project.year}
                    </span>
                  )}
                </div>

                <h2 className="font-['Space_Grotesk'] text-2xl leading-[1] text-[var(--as-text)]">
                  {project.title}
                </h2>

                {project.location && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                    {project.location}
                  </p>
                )}

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--as-text-muted)]">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
