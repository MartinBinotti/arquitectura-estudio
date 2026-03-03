import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const toneMap = {
  sand: "from-[#dee6e9] via-[#c7d3d8] to-[#a8b8be]",
  ink: "from-[#45535b] via-[#2d3940] to-[#1a2227]",
  plum: "from-[#5a646c] via-[#404b53] to-[#242d33]",
  olive: "from-[#8ea2a1] via-[#657b7a] to-[#33403f]",
  clay: "from-[#a4b2ba] via-[#7f919a] to-[#4d5d65]",
  coal: "from-[#5a6770] via-[#3c4951] to-[#1f2a31]"
};

export default function PostCard({ post }) {
  const [hasImageError, setHasImageError] = useState(false);
  const { t } = useLanguage();
  const tone = useMemo(() => toneMap[post.tone] ?? toneMap.sand, [post.tone]);
  const showImage = Boolean(post.image) && !hasImageError;
  const detailPath = post.to || "/galeria";

  return (
    <article className="group overflow-hidden rounded-2xl border border-[color:var(--as-border)] bg-[var(--as-glass-soft)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--as-border-strong)]">
      <div className="relative overflow-hidden">
        {showImage ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div
            className={`flex h-64 items-end bg-gradient-to-br p-5 transition duration-500 group-hover:scale-105 ${tone}`}
          >
            <p className="rounded-full border border-white/45 bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/90">
              {t("Reemplazar imagen", "Replace image")}: {post.image}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--as-text-soft)]">
              {post.category}
            </p>
            <h3 className="mt-1 font-['Space_Grotesk'] text-3xl leading-[1.04] text-[var(--as-text)]">
              {post.title}
            </h3>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-[var(--as-text-soft)]">
            {post.season}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-[var(--as-text-muted)]">
          {post.excerpt}
        </p>

        <Link
          to={detailPath}
          className="inline-block rounded-lg border border-[color:var(--as-border)] px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-[var(--as-text-muted)] transition hover:border-[color:var(--as-border-strong)] hover:text-[var(--as-text)]"
        >
          {t("Ver", "View")}
        </Link>
      </div>
    </article>
  );
}

