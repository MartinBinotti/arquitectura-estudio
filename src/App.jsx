import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SiteFooter from "./components/SiteFooter";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const ImagesPage = lazy(() => import("./pages/ImagesPage"));
const MetodoCreativoPage = lazy(() => import("./pages/MetodoCreativoPage"));
const MetodoCreativoDetailPage = lazy(() => import("./pages/MetodoCreativoDetailPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function StudioApp() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen text-[color:var(--as-text)]">
      <Navbar isOverlay={isHomePage} />

      <Suspense
        fallback={
          <main className="mx-auto flex min-h-[55vh] w-full max-w-7xl items-center justify-center px-4 pt-24 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
              Loading...
            </p>
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/proyecto/:slug" element={<ProjectDetailPage />} />
          <Route path="/projects" element={<Navigate to="/proyectos" replace />} />
          <Route path="/galeria" element={<ImagesPage />} />
          <Route path="/gallery" element={<Navigate to="/galeria" replace />} />
          <Route path="/proceso-estudio" element={<MetodoCreativoPage />} />
          <Route path="/process" element={<Navigate to="/proceso-estudio" replace />} />
          <Route
            path="/proceso-estudio/:sectionId"
            element={<MetodoCreativoDetailPage />}
          />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/contact" element={<Navigate to="/contacto" replace />} />
          <Route path="/imagenes" element={<Navigate to="/galeria" replace />} />
          <Route path="/metodo-creativo" element={<Navigate to="/proceso-estudio" replace />} />
          <Route
            path="/metodo-creativo/:sectionId"
            element={<MetodoCreativoDetailPage />}
          />
          <Route path="/posts" element={<Navigate to="/galeria" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <StudioApp />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
