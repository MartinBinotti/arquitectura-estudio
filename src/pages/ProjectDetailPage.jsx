import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProjectBySlug } from "../services/api";
import { useLanguage } from "../hooks/useLanguage";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchProjectBySlug(slug)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[55vh] w-full max-w-7xl items-center justify-center px-4 pt-28 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
          {t("Cargando proyecto...", "Loading project...")}
        </p>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="mx-auto flex min-h-[55vh] w-full max-w-7xl flex-col items-center justify-center gap-4 px-4 pt-28 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
          {t("Proyecto no encontrado", "Project not found")}
        </p>
        <Link
          to="/proyectos"
          className="inline-flex border border-[color:var(--as-border-strong)] px-4 py-2 text-xs uppercase tracking-[0.12em] text-[var(--as-text)] transition hover:bg-[var(--as-inverse-bg)] hover:text-[var(--as-inverse-text)]"
        >
          {t("Volver a proyectos", "Back to projects")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-10">
        <Link
          to="/proyectos"
          className="mb-4 inline-flex text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)] transition hover:text-[var(--as-text)]"
        >
          ← {t("Proyectos", "Projects")}
        </Link>

        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {project.category && (
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
                {project.category.name}
              </p>
            )}
            <h1 className="mt-2 font-['Space_Grotesk'] text-5xl leading-[0.95] text-[var(--as-text)] sm:text-6xl">
              {project.title}
            </h1>
          </div>

          <div className="flex gap-6 text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
            {project.location && <span>{project.location}</span>}
            {project.year && <span>{project.year}</span>}
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {project.cover_image && (
        <section className="mb-10 overflow-hidden border border-[color:var(--as-border)]">
          <img
            src={project.cover_image}
            alt={project.title}
            className="h-[400px] w-full object-cover sm:h-[500px] lg:h-[600px]"
          />
        </section>
      )}

      {/* Description */}
      <section className="mb-12 grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Descripcion", "Description")}
          </p>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--as-text-muted)]">
          {project.description}
        </p>
      </section>

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <section>
          <p className="mb-6 text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Galeria", "Gallery")} — {project.images.length}{" "}
            {t("imagenes", "images")}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.images.map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImage(img)}
                className="group relative aspect-[4/3] overflow-hidden border border-[color:var(--as-border)] bg-[var(--as-panel)]"
              >
                <img
                  src={img.url}
                  alt={`${project.title} — ${img.sort_order + 1}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/65 p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="max-h-[90vh] max-w-5xl overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt={project.title}
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </main>
  );
}
