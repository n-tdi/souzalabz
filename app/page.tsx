import Image from "next/image";
import Link from "next/link";
import { CultsCurrency, CultsLocale, cultsGraphQL } from "@/lib/cults";
import { MY_CREATIONS, USER_HEADER } from "@/lib/queries";

type Creation = {
  name: string;
  url: string;
  illustrationImageUrl?: string;
  downloadsCount?: number;
  viewsCount?: number;
  totalSalesAmount?: { cents: number };
  blueprints?: { fileUrl?: string; imageUrl?: string }[];
};

function money(cents?: number) {
  if (cents == null) return "—";
  return (cents / 100).toFixed(2);
}

function formatNumber(value?: number) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en", { notation: "compact" }).format(value);
}

function slugFromUrl(url: string) {
  const parts = url.split("/");
  return parts[parts.length - 1] || "";
}

export default async function Page() {
  const locale = (process.env.CULTS_LOCALE ?? "EN") as CultsLocale;
  const currency = (process.env.CULTS_CURRENCY ?? "USD") as CultsCurrency;
  const nick = process.env.CULTS_NICK ?? "nikkasouza";

  // Fetch everything server-side directly from Cults GraphQL
  const [batchData, userData] = await Promise.all([
    cultsGraphQL<{
      myself: { creationsBatch: { total: number; results: Creation[] } };
    }>(MY_CREATIONS, { limit: 60, offset: 0, locale, currency }),

    cultsGraphQL<{ user: { imageUrl?: string; bio?: string; creationsCount?: number; shortUrl?: string } }>(
      USER_HEADER,
      { nick }
    ),
  ]);

  const batch = batchData.myself.creationsBatch;
  const user = userData.user;
  const totals = batch.results.reduce(
    (acc, c) => {
      acc.views += c.viewsCount ?? 0;
      acc.downloads += c.downloadsCount ?? 0;
      acc.revenueCents += c.totalSalesAmount?.cents ?? 0;
      return acc;
    },
    { views: 0, downloads: 0, revenueCents: 0 }
  );
  const featured = batch.results.slice(0, 2);
  const currencySymbol = ({ USD: "$", EUR: "€", GBP: "£" } as const)[currency] ?? "$";

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 px-6 py-8 shadow-[0_0_120px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(115,255,210,0.08),transparent_40%),radial-gradient(circle_at_82%_20%,rgba(255,71,171,0.08),transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(115,255,210,0.08)_20%,transparent_40%),linear-gradient(240deg,rgba(255,71,171,0.08)_20%,transparent_38%)]" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase text-white/70">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
              Cults3D sync online
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">SouzaLabz // Node</p>
              <h1 className="glow mt-3 font-mono text-4xl leading-tight sm:text-5xl">Open Hardware Archive</h1>
              <p className="mt-3 max-w-2xl text-sm text-white/70">
                {user?.bio ?? "Elite EUC armor and control pads, streamed off the Cults3D grid. Tune your lean vectors, harden your stance, and ride the edge with precision."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#models"
                className="flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-400/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-emerald-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(52,211,153,0.45)]"
              >
                Browse vault →
              </a>
              <a
                href={user?.shortUrl ?? "https://cults3d.com/"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 transition hover:-translate-y-0.5 hover:border-white/30"
              >
                Cults profile ↗
              </a>
              <a
                href="https://t.me/souzalabzchat"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-fuchsia-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(236,72,153,0.35)]"
              >
                Telegram chat ↗
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_0_30px_rgba(115,255,210,0.1)]">
                <div className="text-[11px] uppercase text-white/50">Models Indexed</div>
                <div className="glow text-2xl font-semibold text-emerald-100">{batch.total ?? user?.creationsCount ?? batch.results.length}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] uppercase text-white/50">Total Views</div>
                <div className="text-xl font-semibold text-white/90">{formatNumber(totals.views)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] uppercase text-white/50">Downloads</div>
                <div className="text-xl font-semibold text-white/90">{formatNumber(totals.downloads)}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] uppercase text-white/50">Donations</div>
                <div className="text-xl font-semibold text-white/90">{currencySymbol}{money(totals.revenueCents)}</div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 -translate-y-1/3 translate-x-1/4 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-6 bottom-4 h-28 w-28 rounded-full bg-fuchsia-500/15 blur-3xl" />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase text-white/60">
                <span>Signal trace</span>
                <span className="text-emerald-300">stable</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-fuchsia-400" />
              </div>

              {featured.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {featured.map((c) => {
                    const img = c.illustrationImageUrl || c.blueprints?.[0]?.imageUrl;
                    const slug = slugFromUrl(c.url);
                    return (
                      <Link
                        key={c.url}
                        href={`/design/${slug}`}
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40"
                      >
                        <div className="relative aspect-[4/3]">
                          {img ? (
                            <Image
                              src={img}
                              alt={c.name}
                              fill
                              className="object-cover opacity-95 transition duration-300 group-hover:opacity-100"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center font-mono text-[11px] text-white/50">
                              NO IMAGE
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        </div>
                        <div className="p-3">
                          <div className="text-[11px] uppercase text-emerald-200">featured drop</div>
                          <div className="glow line-clamp-2 font-mono text-[13px] text-white/90 sm:text-sm">{c.name}</div>
                          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-white/60">
                            <span>DL {formatNumber(c.downloadsCount)}</span>
                            <span className="text-white/50">→</span>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-40">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-transparent to-fuchsia-500/30" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}

              <div className="rounded-lg border border-white/10 bg-black/50 px-4 py-3 font-mono text-xs text-white/70">
                LIVE FEED: <span className="glow text-emerald-200">all assets synced</span> • Unicycle mods compiled • TPS encrypted
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10" id="models">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase text-white/50">Model vault</p>
            <h2 className="glow font-mono text-2xl">Latest drops</h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase text-white/60">
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />
            real-time from Cults3D
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {batch.results.map((c) => {
            const img = c.illustrationImageUrl || c.blueprints?.[0]?.imageUrl;
            const slug = slugFromUrl(c.url);

            return (
              <Link
                key={c.url}
                href={`/design/${slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-black/40 to-black/80 shadow-[0_15px_60px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-emerald-300/50 hover:shadow-[0_15px_60px_rgba(52,211,153,0.25)]"
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/25 via-transparent to-fuchsia-500/30" />
                </div>

                <div className="relative aspect-[16/10] overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={c.name}
                      fill
                      className="object-cover opacity-90 transition duration-300 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-mono text-xs text-white/40">
                      NO IMAGE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase text-white/70">
                    {slug || "file"}
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                    <h3 className="glow font-mono text-[13px] leading-snug text-white/90 sm:text-sm md:text-base break-words">
                      {c.name}
                    </h3>
                    <span className="whitespace-nowrap rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-[10px] text-white/70">DL {formatNumber(c.downloadsCount)}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[11px] text-white/60">
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                      <div className="text-white/45">VIEWS</div>
                      <div className="text-white/90">{formatNumber(c.viewsCount)}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                      <div className="text-white/45">DL</div>
                      <div className="text-white/90">{formatNumber(c.downloadsCount)}</div>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                      <div className="text-white/45">SALES</div>
                      <div className="text-white/90">{currencySymbol}{money(c.totalSalesAmount?.cents)}</div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/60">
                    <span className="flex items-center gap-2">
                      <span className="h-[1px] w-6 bg-gradient-to-r from-emerald-300 to-fuchsia-400" />
                      OPEN FILE
                    </span>
                    <span className="text-white/70">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur" id="about">
        <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase text-white/50">About the lab</div>
            <h3 className="glow font-mono text-2xl text-white">SouzaLabz.com</h3>
            <p className="text-sm text-white/70">
              No paywalls. No locks. Every file runs free, they&apos;re meant to be remixed, reworked, and pushed harder by the community. We build better when everyone has access.
            </p>
            <p className="text-sm text-white/60">
              Want a remix or a private beta pad? Ping the operator and we&apos;ll splice it into the feed.
            </p>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] uppercase text-white/70">
              <span className="rounded-md border border-emerald-300/40 bg-emerald-400/10 px-3 py-1">TPU proofed</span>
              <span className="rounded-md border border-white/15 bg-white/5 px-3 py-1">3D printed armor</span>
              <span className="rounded-md border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1">open-source</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-5">
            <div className="pointer-events-none absolute -right-10 top-2 h-36 w-36 rounded-full bg-emerald-300/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-8 bottom-2 h-32 w-32 rounded-full bg-fuchsia-400/12 blur-3xl" />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-xl border border-white/15 bg-white/10">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt="avatar"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src="/SouzaLabzLogo3.jpg"
                    alt="SouzaLabz logo"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                    priority
                  />
                )}
              </div>
                <div>
                  <div className="font-mono text-sm text-white/80">Operator: Nikka Souza</div>
                  <div className="text-[11px] font-mono uppercase text-white/60">prints, tests, breaks, remixes</div>
                </div>
              </div>

              <a
                href="https://t.me/souzalabzchat"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-fuchsia-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(236,72,153,0.35)]"
              >
                Telegram chat ↗
              </a>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-[11px] text-white/70">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-white/45">FILES LIVE</div>
                <div className="text-lg text-white/90">{batch.total ?? user?.creationsCount ?? batch.results.length}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-white/45">CULTS URL</div>
                <a
                  className="text-lg text-emerald-200 underline decoration-dotted underline-offset-4 hover:text-emerald-100"
                  href={user?.shortUrl ?? "https://cults3d.com/en/users/nikkasouza"}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.shortUrl ?? "cults3d.com"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
