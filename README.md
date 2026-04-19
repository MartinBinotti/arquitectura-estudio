# Studio Architect

Sitio web de portafolio de arquitectura construido con **React**, **Vite** y **Tailwind CSS**.

## Tecnologías

- React
- Vite
- Tailwind CSS
- React Router

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

La app quedará disponible en `http://localhost:5173`.

Configura el backend CMS en `.env`:

```bash
VITE_API_URL=http://localhost:8000/api/v1
VITE_STORAGE_URL=http://localhost:8000/storage
```

## Build de producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

## Vista previa del build

```bash
npm run preview
```

## Estructura principal

```text
src/
  assets/        # Imágenes y video
  components/    # Componentes reutilizables
  context/       # Contextos globales (idioma/tema)
  data/          # Contenido y datos estáticos
  hooks/         # Hooks personalizados
  pages/         # Páginas del sitio
```

## Subir a GitHub

```bash
git init
git add .
git commit -m "chore: configuración inicial"
git branch -M main
git remote add origin <URL_DEL_REPO>
git push -u origin main
```

## Scripts disponibles

- `npm run dev`: inicia servidor de desarrollo
- `npm run build`: genera build de producción
- `npm run preview`: previsualiza el build
