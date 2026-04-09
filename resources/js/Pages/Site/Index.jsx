import { Head } from "@inertiajs/react";
import {
  ArrowUpRight,
  Bug,
  Cog,
  ListChecks,
  Mail,
  Search,
  Zap,
} from "lucide-react";

const extensions = [
  {
    icon: Search,
    name: "yii2-debug",
    tag: "OBSERVABILITY",
    description:
      "Debug toolbar and debugger for Yii2. Inspect logs, database queries, request data, and application performance in real time.",
    url: "https://www.yiiframework.com/extension/yiisoft/yii2-debug",
  },
  {
    icon: Cog,
    name: "yii2-gii",
    tag: "SCAFFOLDING",
    description:
      "Automatic code generator for models, controllers, CRUD, forms, and modules. Boost your productivity with scaffolding.",
    url: "https://www.yiiframework.com/extension/yiisoft/yii2-gii",
  },
  {
    icon: ListChecks,
    name: "yii2-queue",
    tag: "BACKGROUND JOBS",
    description:
      "Asynchronous job queue with support for DB, Redis, AMQP, Beanstalk, and SQS drivers. Run background tasks with ease.",
    url: "https://www.yiiframework.com/extension/yiisoft/yii2-queue",
  },
  {
    icon: Zap,
    name: "yii2-redis",
    tag: "CACHE LAYER",
    description:
      "Redis integration providing cache, session, and ActiveRecord support. Leverage in-memory storage for blazing-fast data access.",
    url: "https://www.yiiframework.com/extension/yiisoft/yii2-redis",
  },
  {
    icon: Bug,
    name: "yii2-elasticsearch",
    tag: "FULL-TEXT SEARCH",
    description:
      "Elasticsearch integration with ActiveRecord and query builder. Add powerful full-text search capabilities to your application.",
    url: "https://www.yiiframework.com/extension/yiisoft/yii2-elasticsearch",
  },
  {
    icon: Mail,
    name: "yii2-symfonymailer",
    tag: "TRANSACTIONAL MAIL",
    description:
      "Email sending integration powered by Symfony Mailer. Compose and deliver rich HTML emails with attachments and templates.",
    url: "https://github.com/yiisoft/yii2-symfonymailer",
  },
];

export default function Index() {
  return (
    <>
      <Head title="My Yii Application" />

      <div className="flex grow flex-col gap-5 py-1">
        {/* ============== Hero ============== */}
        <section className="hero-banner relative overflow-hidden rounded-3xl text-white">
          <div className="relative z-10 grid gap-6 px-6 py-6 sm:px-10 sm:py-7 lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:px-14 lg:py-7">
            {/* left: copy */}
            <div className="flex flex-col justify-center">
              <span className="mb-2.5 inline-flex items-center gap-3 self-start font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white">
                <span className="h-px w-7 bg-white/80" />
                Yii2 · v22.0
              </span>

              <h1 className="font-display text-[clamp(1.85rem,4vw,2.85rem)] font-light leading-[1] tracking-[-0.02em] text-white">
                Build with{" "}
                <em
                  className="font-light italic text-white/95"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
                >
                  Yii Framework.
                </em>
              </h1>

              <p className="mt-2.5 max-w-[42ch] text-[0.9rem] leading-relaxed text-white/80">
                A high-performance PHP framework for serious web applications.
                Fast, secure, professional, and now wired through Inertia &amp;
                React.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.yiiframework.com/doc/guide/2.0/en/start-installation"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn-cream inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                >
                  Get Started
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href="https://www.yiiframework.com/doc/api/2.0"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn-ghost-light inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                >
                  API Reference
                </a>
              </div>
            </div>

            {/* right: editorial detail block */}
            <aside className="relative hidden flex-col lg:flex">
              <div className="flex flex-1 items-center justify-end pr-2">
                <img
                  src="/images/yii3_full_white_for_dark.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-[120px] opacity-55"
                />
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/25 pt-6 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-white/75">
                <div>
                  <dt className="mb-1 text-white/65">Stack</dt>
                  <dd className="font-semibold text-white">
                    PHP 8.5 · React 19
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-white/65">Adapter</dt>
                  <dd className="font-semibold text-white">Inertia v3</dd>
                </div>
                <div>
                  <dt className="mb-1 text-white/65">UI</dt>
                  <dd className="font-semibold text-white">
                    shadcn · Tailwind v4
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-white/65">Bundler</dt>
                  <dd className="font-semibold text-white">Vite 8</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        {/* ============== Extensions list ============== */}
        <section>
          <header className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="section-eyebrow">Featured extensions</span>
              <h2 className="mt-1.5 font-display text-2xl font-light tracking-[-0.01em] text-foreground sm:text-[1.65rem]">
                Six modules,{" "}
                <em
                  className="italic text-primary"
                  style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 50" }}
                >
                  one stack.
                </em>
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              The official extensions you reach for first. Click any card to
              read the full guide on yiiframework.com.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {extensions.map((ext, index) => {
              const Icon = ext.icon;
              const num = String(index + 1).padStart(2, "0");

              return (
                <a
                  key={ext.name}
                  href={ext.url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="editorial-card group flex flex-col gap-2.5 bg-card px-5 py-4"
                  aria-label={`Learn more about ${ext.name} (opens in new tab)`}
                >
                  <div className="flex items-start justify-between">
                    <span className="card-num">
                      {num} / {ext.tag}
                    </span>
                    <Icon
                      className="size-[18px] text-muted-foreground transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display text-[1.25rem] font-medium leading-tight tracking-[-0.01em] text-foreground">
                    {ext.name}
                  </h3>

                  <p className="text-[0.78rem] leading-relaxed text-muted-foreground">
                    {ext.description}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                    Learn more
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
