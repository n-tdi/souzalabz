"use client";

import { useEffect, useState } from "react";

type DonationsThankYouCardProps = {
  amountLabel: string;
  donorNames: string[];
};

export default function DonationsThankYouCard({
  amountLabel,
  donorNames,
}: DonationsThankYouCardProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:shadow-[0_0_24px_rgba(52,211,153,0.15)]"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <div className="text-[11px] uppercase text-white/50">Donations</div>
        <div className="text-xl font-semibold text-white/90">{amountLabel}</div>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="donor-thank-you-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 bg-black/90 p-6 shadow-[0_0_120px_rgba(0,0,0,0.65)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(115,255,210,0.12),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(255,71,171,0.14),transparent_36%)]" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs uppercase tracking-[0.25em] text-emerald-200/80">
                    Community Support
                  </div>
                  <h2
                    id="donor-thank-you-title"
                    className="glow mt-2 font-mono text-3xl leading-tight text-white sm:text-5xl"
                  >
                    THANK YOU
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    Huge thanks to everyone who donated and keeps SouzaLabz moving.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase text-white/70 transition hover:border-white/30 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between gap-3 font-mono text-xs uppercase text-white/60">
                  <span>Donor list</span>
                  <span className="text-emerald-200">{donorNames.length} supporters</span>
                </div>

                {donorNames.length ? (
                  <div className="max-h-[50vh] overflow-y-auto pr-1">
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {donorNames.map((name) => (
                        <li
                          key={name}
                          className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-white/85"
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-3 font-mono text-sm text-white/60">
                    No donor names returned yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
