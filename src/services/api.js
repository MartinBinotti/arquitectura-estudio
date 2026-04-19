/**
 * API Service — Studio Architect CMS
 *
 * Servicio centralizado para consumir la API REST de Laravel.
 * Todas las peticiones públicas (sin autenticación) para el frontend.
 */

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1").replace(/\/$/, "");
const STORAGE_URL =
  (import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage").replace(/\/$/, "");

function extractData(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object" && "data" in payload) return payload.data;
  return payload;
}

function resolveAssetUrl(path) {
  if (!path || typeof path !== "string") return null;
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath.startsWith("/storage/")) {
    return `${STORAGE_URL}${normalizedPath.replace(/^\/storage/, "")}`;
  }

  return `${STORAGE_URL}${normalizedPath}`;
}

function normalizeCategory(category) {
  if (!category || typeof category !== "object") return null;

  return {
    id: category.id ?? category.slug ?? category.name ?? null,
    name: category.name ?? category.title ?? "",
    slug: category.slug ?? null,
    projects_count: category.projects_count ?? category.projectsCount ?? 0,
  };
}

function normalizeImage(image, index = 0) {
  if (!image || typeof image !== "object") return null;

  return {
    id: image.id ?? image.uuid ?? image.url ?? `image-${index}`,
    url: resolveAssetUrl(image.url ?? image.path ?? image.image_url ?? image.image),
    sort_order: image.sort_order ?? image.sortOrder ?? index,
  };
}

function normalizeProject(project) {
  if (!project || typeof project !== "object") return null;

  const images = Array.isArray(project.images)
    ? project.images.map(normalizeImage).filter(Boolean)
    : [];

  return {
    id: project.id ?? project.slug ?? project.title ?? null,
    title: project.title ?? project.name ?? "",
    slug: project.slug ?? null,
    description: project.description ?? project.summary ?? "",
    location: project.location ?? project.city ?? "",
    year: project.year ?? project.project_year ?? null,
    cover_image: resolveAssetUrl(
      project.cover_image ?? project.coverImage ?? project.thumbnail ?? project.featured_image
    ),
    category: normalizeCategory(project.category),
    images,
  };
}

/**
 * Fetch wrapper con manejo de errores.
 */
async function request(endpoint) {
  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch {
    throw new Error("No se pudo conectar con el CMS.");
  }

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null
        ? payload.message || payload.error
        : null;

    throw new Error(message || `API Error: ${response.status} ${response.statusText}`);
  }

  return payload;
}

/**
 * Obtener todos los proyectos.
 * @param {Object} filters - Filtros opcionales { category, year }
 * @returns {Promise<Array>} Lista de proyectos
 */
export async function fetchProjects(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.append("category", filters.category);
  if (filters.year) params.append("year", filters.year);

  const query = params.toString() ? `?${params.toString()}` : "";
  const payload = await request(`/projects${query}`);
  const projects = extractData(payload);
  return Array.isArray(projects) ? projects.map(normalizeProject).filter(Boolean) : [];
}

/**
 * Obtener un proyecto por slug.
 * @param {string} slug
 * @returns {Promise<Object>} Proyecto con imágenes
 */
export async function fetchProjectBySlug(slug) {
  const payload = await request(`/projects/${slug}`);
  const project = extractData(payload);
  return project ? normalizeProject(project) : null;
}

/**
 * Obtener todas las categorías.
 * @returns {Promise<Array>} Lista de categorías con conteo de proyectos
 */
export async function fetchCategories() {
  const payload = await request("/categories");
  const categories = extractData(payload);
  return Array.isArray(categories)
    ? categories.map(normalizeCategory).filter(Boolean)
    : [];
}

export { API_URL, STORAGE_URL };
