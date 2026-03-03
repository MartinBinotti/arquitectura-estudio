import { getStudioImage } from "./media";

const sectionsBase = [
  {
    id: "analisis-sitio",
    image: getStudioImage(0),
    es: {
      title: "Analisis de Sitio",
      brief:
        "Estudio de entorno, normativa y condiciones climaticas para definir oportunidades y restricciones del proyecto.",
      highlights: [
        "Mapeo urbano y relacion con el contexto inmediato",
        "Lectura de orientacion solar, vientos y sombras",
        "Diagnostico de accesos y flujos de uso"
      ]
    },
    en: {
      title: "Site Analysis",
      brief:
        "Context, regulations, and climate study to identify opportunities and project constraints.",
      highlights: [
        "Urban mapping and immediate context relations",
        "Sun orientation, wind patterns, and shadow analysis",
        "Access points and user flow diagnosis"
      ]
    }
  },
  {
    id: "concepto-espacial",
    image: getStudioImage(1),
    es: {
      title: "Concepto Espacial",
      brief:
        "Sintesis de programa, forma y circulaciones para construir una propuesta coherente a nivel funcional y formal.",
      highlights: [
        "Organizacion de piezas y jerarquia de espacios",
        "Estrategia de iluminacion natural y visuales",
        "Definicion de volumetria y envolvente"
      ]
    },
    en: {
      title: "Spatial Concept",
      brief:
        "Synthesis of program, form, and circulation to build a coherent functional and formal proposal.",
      highlights: [
        "Program organization and spatial hierarchy",
        "Daylight and view strategy",
        "Volumetric definition and envelope logic"
      ]
    }
  },
  {
    id: "desarrollo-tecnico",
    image: getStudioImage(2),
    es: {
      title: "Desarrollo Tecnico",
      brief:
        "Produccion de documentacion ejecutiva, detalles y especificaciones para licitar y construir con precision.",
      highlights: [
        "Planos ejecutivos y detalles constructivos",
        "Coordinacion con estructura e instalaciones",
        "Criterios de materialidad, costos y mantenimiento"
      ]
    },
    en: {
      title: "Technical Development",
      brief:
        "Production of execution documents, details, and specifications for precise tendering and construction.",
      highlights: [
        "Execution drawings and technical details",
        "Coordination with structure and MEP systems",
        "Material, cost, and maintenance criteria"
      ]
    }
  }
];

export function getMethodSections(language = "es") {
  const locale = language === "en" ? "en" : "es";

  return sectionsBase.map((section) => ({
    id: section.id,
    title: section[locale].title,
    brief: section[locale].brief,
    image: section.image,
    highlights: section[locale].highlights
  }));
}
