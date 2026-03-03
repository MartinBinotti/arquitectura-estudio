import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--as-text-soft)]">
        {t("Error 404", "Error 404")}
      </p>
      <h1 className="mt-4 font-['Space_Grotesk'] text-6xl text-[var(--as-text)]">
        {t("Ruta no encontrada", "Route not found")}
      </h1>
      <p className="mt-4 max-w-lg text-sm text-[var(--as-text-muted)]">
        {t(
          "Esta ruta no existe en Estudio Norte. Volve al inicio para seguir explorando el estudio.",
          "This route does not exist in North Studio. Go back home to continue exploring."
        )}
      </p>
      <Link
        to="/"
        className="mt-8 rounded-lg border border-[color:var(--as-border-strong)] px-6 py-3 text-xs uppercase tracking-[0.12em] text-[var(--as-text)] transition hover:bg-[var(--as-inverse-bg)] hover:text-[var(--as-inverse-text)]"
      >
        {t("Volver al inicio", "Back to home")}
      </Link>
    </main>
  );
}

