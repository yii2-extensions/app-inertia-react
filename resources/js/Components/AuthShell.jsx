import { Link, usePage } from "@inertiajs/react";

import { Card } from "@/Components/ui/card";

/**
 * Editorial split-panel shell shared by every authentication page.
 *
 * Left brand panel: gradient mesh + brand mark + display title + tagline + decorative meta block.
 * Right form panel: small mono eyebrow + display title + subtitle + arbitrary children.
 */
export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  brandTitle,
  brandSubtitle,
  brandMeta,
  children,
}) {
  const { props } = usePage();
  const appName = props.appName;
  return (
    <div className="flex grow items-center justify-center py-4">
      <Card className="w-full max-w-[960px] overflow-hidden border-border/70 p-0 shadow-xl shadow-foreground/5">
        <div className="grid md:grid-cols-[5fr_7fr]">
          {/* === Brand panel === */}
          <aside className="brand-mesh relative hidden text-white md:flex">
            <div className="relative z-10 flex w-full flex-col justify-between gap-5 p-6 lg:p-7">
              <div className="flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-md bg-white text-[hsl(196_60%_38%)] font-display text-sm font-medium leading-none">
                    Y
                  </span>
                  <span className="font-display text-[1.15rem] font-medium leading-none tracking-[-0.01em] text-white">
                    {appName ?? "Yii"}
                  </span>
                </Link>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/70">
                  /auth
                </span>
              </div>

              <div>
                <h2
                  className="font-display whitespace-pre-line text-[2.1rem] font-medium leading-[0.95] tracking-[-0.02em] text-white"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
                >
                  {brandTitle}
                </h2>
                <p className="mt-3 max-w-[28ch] text-[0.88rem] leading-relaxed text-white/80">
                  {brandSubtitle}
                </p>
              </div>

              {brandMeta ? (
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-white/40 pt-4 font-mono text-[0.62rem] uppercase tracking-[0.18em]">
                  {brandMeta.map((item) => (
                    <div key={item.label}>
                      <dt className="font-medium text-white/90">{item.label}</dt>
                      <dd className="font-semibold text-white">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/85">
                  Yii2 · Inertia · React 19
                </div>
              )}
            </div>
          </aside>

          {/* === Form panel === */}
          <div className="flex flex-col bg-card">
            <div className="flex flex-col p-6 lg:p-8">
              <header className="mb-4">
                {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
                <h1
                  className={`font-display text-[1.7rem] font-medium leading-[1.05] tracking-[-0.015em] text-foreground ${
                    eyebrow ? "mt-2" : ""
                  }`}
                >
                  {title}
                </h1>
                {subtitle ? (
                  <p className="mt-1.5 text-[0.85rem] text-muted-foreground">{subtitle}</p>
                ) : null}
              </header>

              {children}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
