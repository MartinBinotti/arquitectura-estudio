import { getStudioImage } from "./media";

const postBase = [
  {
    id: "analisis-sitio",
    image: getStudioImage(0),
    tone: "sand",
    to: "/proceso-estudio/analisis-sitio",
    es: {
      title: "Analisis de Sitio",
      category: "Investigacion",
      season: "Fase 01",
      excerpt:
        "Levantamiento de contexto, asoleamiento, vientos y preexistencias para orientar decisiones de implantacion."
    },
    en: {
      title: "Site Analysis",
      category: "Research",
      season: "Phase 01",
      excerpt:
        "Context mapping, sun exposure, winds, and existing constraints to guide key placement decisions."
    }
  },
  {
    id: "concepto-espacial",
    image: getStudioImage(1),
    tone: "ink",
    to: "/proceso-estudio/concepto-espacial",
    es: {
      title: "Concepto Espacial",
      category: "Estrategia",
      season: "Fase 02",
      excerpt:
        "Definicion de volumetria, circulaciones y relaciones programaticas para estructurar la experiencia del usuario."
    },
    en: {
      title: "Spatial Concept",
      category: "Strategy",
      season: "Phase 02",
      excerpt:
        "Volumetric setup, circulation logic, and program relationships to shape the user experience."
    }
  },
  {
    id: "desarrollo-tecnico",
    image: getStudioImage(2),
    tone: "plum",
    to: "/proceso-estudio/desarrollo-tecnico",
    es: {
      title: "Desarrollo Tecnico",
      category: "Documentacion",
      season: "Fase 03",
      excerpt:
        "Planos, detalles y coordinacion de especialidades para garantizar viabilidad constructiva y control de obra."
    },
    en: {
      title: "Technical Development",
      category: "Documentation",
      season: "Phase 03",
      excerpt:
        "Drawings, details, and cross-discipline coordination to ensure constructability and site control."
    }
  },
  {
    id: "materialidad-sostenible",
    image: getStudioImage(3),
    tone: "olive",
    es: {
      title: "Materialidad Sostenible",
      category: "Materiales",
      season: "Fase 04",
      excerpt:
        "Comparativas de sistemas, acabados y mantenimiento para optimizar ciclo de vida y eficiencia del edificio."
    },
    en: {
      title: "Sustainable Materiality",
      category: "Materials",
      season: "Phase 04",
      excerpt:
        "System and finish comparisons to improve lifecycle performance and long-term building efficiency."
    }
  },
  {
    id: "interiorismo-funcional",
    image: getStudioImage(4),
    tone: "clay",
    es: {
      title: "Interiorismo Funcional",
      category: "Interiores",
      season: "Fase 05",
      excerpt:
        "Diseno de espacios interiores con foco en ergonomia, luz natural y continuidad entre arquitectura y mobiliario."
    },
    en: {
      title: "Functional Interiors",
      category: "Interiors",
      season: "Phase 05",
      excerpt:
        "Interior design focused on ergonomics, daylight, and continuity between architecture and furniture."
    }
  },
  {
    id: "obra-y-seguimiento",
    image: getStudioImage(5),
    tone: "coal",
    es: {
      title: "Obra y Seguimiento",
      category: "Direccion de Obra",
      season: "Fase 06",
      excerpt:
        "Bitacora de avances, control de calidad y resolucion de ajustes en campo durante la ejecucion."
    },
    en: {
      title: "Construction Follow-Up",
      category: "Site Management",
      season: "Phase 06",
      excerpt:
        "Progress logs, quality control, and on-site issue resolution during construction."
    }
  }
];

export function getPosts(language = "es") {
  const locale = language === "en" ? "en" : "es";

  return postBase.map((post) => ({
    id: post.id,
    title: post[locale].title,
    category: post[locale].category,
    season: post[locale].season,
    image: post.image,
    tone: post.tone,
    to: post.to,
    excerpt: post[locale].excerpt
  }));
}
