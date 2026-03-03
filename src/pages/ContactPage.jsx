import { useLanguage } from "../hooks/useLanguage";

export default function ContactPage() {
  const { t } = useLanguage();

  const contactItems = [
    { label: t("Email", "Email"), value: "hola@estudionorte.arq" },
    { label: t("Instagram", "Instagram"), value: "@estudionorte.arq" },
    { label: t("Ubicacion", "Location"), value: t("Madrid, Espana", "Madrid, Spain") }
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <header className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
            {t("Contacto", "Contact")}
          </p>
          <h1 className="mt-2 font-['Space_Grotesk'] text-5xl leading-[0.95] text-[var(--as-text)] sm:text-6xl">
            {t("Iniciar Conversacion", "Start a Conversation")}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--as-text-muted)]">
          {t(
            "Compartinos contexto, escala y objetivos. En 24-48 hs te devolvemos una propuesta de trabajo.",
            "Share your context, scale, and goals. We will reply within 24-48h with a work proposal."
          )}
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={(event) => event.preventDefault()}
          className="space-y-5 border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                {t("Nombre", "Name")}
              </span>
              <input
                type="text"
                className="w-full border border-[color:var(--as-border)] bg-[var(--as-input-bg)] px-3 py-2 text-sm text-[var(--as-text)] placeholder:text-[var(--as-text-soft)] focus:border-[color:var(--as-accent)] focus:outline-none"
                placeholder={t("Tu nombre", "Your name")}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                Email
              </span>
              <input
                type="email"
                className="w-full border border-[color:var(--as-border)] bg-[var(--as-input-bg)] px-3 py-2 text-sm text-[var(--as-text)] placeholder:text-[var(--as-text-soft)] focus:border-[color:var(--as-accent)] focus:outline-none"
                placeholder="tu@email.com"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
              {t("Tipo de Proyecto", "Project Type")}
            </span>
            <input
              type="text"
              className="w-full border border-[color:var(--as-border)] bg-[var(--as-input-bg)] px-3 py-2 text-sm text-[var(--as-text)] placeholder:text-[var(--as-text-soft)] focus:border-[color:var(--as-accent)] focus:outline-none"
              placeholder={t(
                "Vivienda, reforma, comercial, equipamiento",
                "Housing, retrofit, commercial, public facility"
              )}
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
              {t("Mensaje", "Message")}
            </span>
            <textarea
              rows={7}
              className="w-full resize-y border border-[color:var(--as-border)] bg-[var(--as-input-bg)] px-3 py-2 text-sm text-[var(--as-text)] placeholder:text-[var(--as-text-soft)] focus:border-[color:var(--as-accent)] focus:outline-none"
              placeholder={t(
                "Contanos ubicacion, superficie, plazos y objetivos del proyecto...",
                "Tell us location, area, timeline, and project goals..."
              )}
              required
            />
          </label>

          <button
            type="submit"
            className="inline-flex border border-[color:var(--as-border-strong)] bg-[var(--as-inverse-bg)] px-5 py-3 text-xs uppercase tracking-[0.12em] text-[var(--as-inverse-text)] transition hover:bg-transparent hover:text-[var(--as-text)]"
          >
            {t("Enviar Consulta", "Send Inquiry")}
          </button>
        </form>

        <aside className="space-y-4">
          <div className="border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] p-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
              {t("Canales Directos", "Direct Channels")}
            </p>
            <div className="mt-4 space-y-4">
              {contactItems.map((item) => (
                <article
                  key={item.label}
                  className="border border-[color:var(--as-border)] bg-[var(--as-panel)] px-4 py-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-[var(--as-text-muted)]">{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden border border-[color:var(--as-border)] bg-[var(--as-panel)] p-5">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--as-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--as-grid-line)_1px,transparent_1px)] bg-[length:28px_28px]" />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--as-text-soft)]">
                {t("Agenda de Inicio", "Kickoff Schedule")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--as-text-muted)]">
                {t(
                  "Primera reunion de diagnostico, presencial u online, para revisar alcance, presupuesto y tiempos.",
                  "First diagnostic meeting, onsite or online, to review scope, budget, and timelines."
                )}
              </p>
              <p className="mt-4 font-['Space_Grotesk'] text-2xl text-[var(--as-text)]">
                {t("Disponibilidad: Mar - Vie", "Availability: Tue - Fri")}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

