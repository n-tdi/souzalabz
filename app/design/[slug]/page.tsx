import Image from "next/image";
import Link from "next/link";
import { CultsCurrency, CultsLocale, cultsGraphQL } from "@/lib/cults";
import { CREATION_BY_SLUG } from "@/lib/queries";

type Creation = {
  name: string;
  shortUrl?: string;
  illustrationImageUrl?: string;
  license?: { name?: string };
  category?: { name?: string };
  publishedAt?: string;
  viewsCount?: number;
  likesCount?: number;
  downloadsCount?: number;
  tags?: string[];
  price?: { cents?: number };
  creator?: { nick?: string; shortUrl?: string };
};

function formatNumber(value?: number) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}

export default async function DesignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: raw } = await params;
  
  // Normalize slug (handles trailing spaces, URL encoding, etc.)
//   const raw = params.slug;

  // In some edge cases, Next can pass something odd — guard it.
  if (!raw || typeof raw !== "string") {
    return <div className="p-10 font-mono text-white/70">Invalid slug.</div>;
  }

  // Decode %xx sequences (safe) and trim whitespace
  const decoded = decodeURIComponent(raw).trim();

  // HARD validation: Cults slugs are typically URL-safe segments.
  // This rejects empty strings and weird stuff like "foo/bar" or "foo?x=y".
  const isValid = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(decoded);

  if (!isValid) {
    return (
      <div className="p-10 font-mono text-white/70">
        Invalid slug: <span className="text-white/90">{decoded}</span>
      </div>
    );
  }

  const locale = (process.env.CULTS_LOCALE ?? "EN") as CultsLocale;
  const currency = (process.env.CULTS_CURRENCY ?? "USD") as CultsCurrency;
  const currencySymbol = ({ USD: "$", EUR: "€", GBP: "£" } as const)[currency] ?? "$";

  const data = await cultsGraphQL<{ creation: Creation | null }>(
    CREATION_BY_SLUG,
    { slug: decoded, locale, currency }
  );


  const c = data.creation;
  if (!c) return <div className="p-10 font-mono text-white/70">Not found.</div>;
  const published = c.publishedAt ? new Date(c.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;
  const price = c.price?.cents != null ? `${currencySymbol}${(c.price.cents / 100).toFixed(2)}` : "FREE";

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
      <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase text-white/70 transition hover:text-white">
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        Return to vault
      </Link>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr,0.9fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_15px_80px_rgba(0,0,0,0.45)]">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(115,255,210,0.12),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(255,71,171,0.14),transparent_38%)]" />
          </div>
          <div className="relative aspect-[16/9] bg-black/40">
            {c.illustrationImageUrl ? (
              <Image src={c.illustrationImageUrl} alt={c.name} fill className="object-cover opacity-95" />
            ) : (
              <div className="flex h-full items-center justify-center font-mono text-sm text-white/50">
                IMAGE STREAM OFFLINE
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-0 w-full p-6">
              <h1 className="glow font-mono text-2xl leading-tight sm:text-3xl md:text-4xl">{c.name}</h1>
              <div className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-white/70">
                {c.category?.name ? <span className="rounded-md border border-emerald-300/40 bg-emerald-400/10 px-2 py-1">{c.category.name}</span> : null}
                {c.license?.name ? <span className="rounded-md border border-white/20 bg-white/10 px-2 py-1">{c.license.name}</span> : null}
                {c.creator?.nick ? <span className="rounded-md border border-fuchsia-400/40 bg-fuchsia-500/10 px-2 py-1">by {c.creator.nick}</span> : null}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/60 px-6 py-4 font-mono text-[11px] uppercase text-white/60">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">slug: {decoded}</span>
              {published ? <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1">published {published}</span> : null}
              <span className="flex items-center gap-2">
                <span className="h-[1px] w-10 bg-gradient-to-r from-emerald-300 to-fuchsia-500" />
                status: live on Cults3D
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-fuchsia-500/12 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-[11px] uppercase text-white/50">Telemetry</div>
                  <div className="glow font-mono text-xl text-white">Signal readout</div>
                </div>
                <div className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase text-emerald-100">Price {price}</div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs text-white/70">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <div className="text-white/45">Views</div>
                  <div className="text-lg text-white/90">{formatNumber(c.viewsCount)}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <div className="text-white/45">Downloads</div>
                  <div className="text-lg text-white/90">{formatNumber(c.downloadsCount)}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <div className="text-white/45">Likes</div>
                  <div className="text-lg text-white/90">{formatNumber(c.likesCount)}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <div className="text-white/45">License</div>
                  <div className="text-white/80">{c.license?.name ?? "—"}</div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={c.shortUrl ?? "https://cults3d.com/"}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-emerald-300/50 bg-emerald-400/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-emerald-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(52,211,153,0.35)]"
                >
                  Open on Cults ↗
                </a>
                {c.creator?.shortUrl ? (
                  <a
                    href={c.creator.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/75 transition hover:-translate-y-0.5 hover:border-white/30"
                  >
                    Creator profile
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {c.tags?.length ? (
            <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase text-white/50">Tags</div>
                <span className="h-[1px] w-16 bg-gradient-to-r from-emerald-300 to-fuchsia-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {c.tags.slice(0, 40).map((t: string) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 font-mono text-xs text-white/70">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md border border-white/10 bg-black/40 px-2 py-1">Blueprint ready</span>
              <span className="rounded-md border border-white/10 bg-black/40 px-2 py-1">Secure download</span>
              <span className="rounded-md border border-white/10 bg-black/40 px-2 py-1">Optimized for TPU</span>
            </div>
            <div className="mt-3 text-white/60">
              Slice, print, and ride. Don&apos;t forget to publish a make.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
