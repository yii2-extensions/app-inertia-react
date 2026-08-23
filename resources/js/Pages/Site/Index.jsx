import { Head, InfiniteScroll, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

const releaseProofs = [
    {
        id: "standalone-actions",
        index: "01",
        area: "Standalone HTTP actions",
        title: "One route. One focused class.",
        description:
            "Place a class in the controller namespace and Yii discovers the route, binds the request, and resolves typed run() dependencies without a hosting controller.",
        signal: "NEW ROUTE PRIMITIVE",
        accent: "orange",
        href: "https://github.com/yiisoft/yii2/blob/22.0/docs/guide/tutorial-standalone-actions.md",
        file: "app/controllers/HealthAction.php",
        request: "GET /health",
        code: [
            { text: "final class HealthAction extends Action", emphasis: true },
            { text: "{" },
            {
                text: "    public function run(Connection $db): string",
                emphasis: true,
            },
            { text: "    {" },
            {
                text: "        return $db->createCommand('SELECT 1')->queryScalar()",
            },
            { text: "            ? 'ready' : 'down';" },
            { text: "    }" },
            { text: "}" },
        ],
        note: "22.0 resolves the $db component by name and type before run() executes.",
        facts: [
            { label: "Discovery", value: "Convention" },
            { label: "Dependencies", value: "Auto-wired" },
        ],
    },
    {
        id: "union-query",
        index: "02",
        area: "Compound query controls",
        title: "Sort the UNION, not its first SELECT.",
        description:
            "Yii 2.0/master can compose a UNION. Branch 22.0 adds explicit ordering and pagination for the complete compound result through one portable query API.",
        signal: "22.0-ONLY GLOBAL API",
        accent: "green",
        href: "https://github.com/yiisoft/yii2/blob/22.0/framework/UPGRADE-22.md",
        file: "OrderFeed.php",
        request: "COMPOUND RESULT",
        code: [
            { text: "$query = (new Query())" },
            { text: "    ->from('orders')" },
            {
                text: "    ->union((new Query())->from('archived_orders'), true)",
            },
            {
                text: "    ->unionOrderBy(['created_at' => SORT_DESC])",
                emphasis: true,
            },
            { text: "    ->unionLimit(20)", emphasis: true },
            { text: "    ->unionOffset(40);", emphasis: true },
        ],
        note: "The highlighted modifiers are not available on the 2.0/master line.",
        facts: [
            { label: "Scope", value: "Whole UNION" },
            { label: "Controls", value: "Order + page" },
        ],
    },
];

const foundationChanges = [
    {
        area: "Front end",
        title: "Legacy assumptions are optional.",
        description:
            "NPM-first assets, opt-in jQuery, native DOM events, and Bootstrap-agnostic widget defaults.",
        signal: "NPM / DOM / CSS",
        accent: "blue",
    },
    {
        area: "Runtime",
        title: "A modern PHP baseline.",
        description:
            "PHP 8.3+ and Composer-only autoloading remove compatibility paths from new applications.",
        signal: "PHP 8.3+",
        accent: "green",
    },
    {
        area: "Safety + logs",
        title: "Interoperable where it matters.",
        description:
            "Sensitive parameters are redacted while bidirectional PSR-3 adapters connect Yii and external loggers.",
        signal: "SENSITIVE / PSR-3",
        accent: "orange",
    },
];

const stack = [
    {
        name: "PHP 8.3+",
        role: "Runtime",
        detail: "A typed, current foundation for the server-side application.",
    },
    {
        name: "Yii 22.0",
        role: "Application",
        detail: "Routing, validation, persistence, security, and dependency injection.",
    },
    {
        name: "Inertia 3",
        role: "Protocol",
        detail: "Server-driven pages without building and maintaining a separate API.",
    },
    {
        name: "React 19 + Vite 8",
        role: "Interface",
        detail: "Reactive views, instant feedback, and a modern asset pipeline.",
    },
];

const resolveAccountDemo = (auth) => {
    if (auth.isGuest) {
        return {
            href: "/user/signup",
            label: "Create an account",
        };
    }

    if (auth.canViewUsers) {
        return {
            href: "/user/index",
            label: "Open user console",
        };
    }

    return {
        href: "/site/about",
        label: "Read the project overview",
    };
};

export default function Index({ protocolFeed, runtime }) {
    const { props, url } = usePage();
    const [refreshing, setRefreshing] = useState(false);
    const accountDemo = resolveAccountDemo(props.auth);
    const demos = [
        {
            eyebrow: "Identity",
            title: "Account flow",
            description:
                "Follow server-side validation through signup, verification, login, and password recovery.",
            href: accountDemo.href,
            label: accountDemo.label,
            inertia: true,
        },
        ...(props.canAccessDebug
            ? [
                  {
                      eyebrow: "Diagnostics",
                      title: "Yii debug panel",
                      description:
                          "Inspect requests, queries, logs, configuration, and timings with the integrated development module.",
                      href: "/debug/index",
                      label: "Inspect the runtime",
                      inertia: false,
                  },
              ]
            : []),
        {
            eyebrow: "Source",
            title: "Start from the template",
            description:
                "Explore the complete Yii2, Inertia, React, and Vite application structure on GitHub.",
            href: "https://github.com/yii2-extensions/app-inertia-react",
            label: "View source code",
            inertia: false,
            external: true,
        },
    ];

    const replayRequest = () => {
        router.reload({
            only: ["runtime"],
            onStart: () => setRefreshing(true),
            onFinish: () => setRefreshing(false),
        });
    };

    return (
        <>
            <Head>
                <title>Yii 22.0 Preview — Modern PHP, familiar Yii</title>
                <meta
                    head-key="description"
                    name="description"
                    content="Explore the Yii 22.0 development line with PHP 8.3, Inertia 3, React 19, and Vite 8."
                />
            </Head>

            <div className="landing-page">
                <section
                    className="release-hero"
                    aria-labelledby="release-heading"
                >
                    <div className="release-hero__copy">
                        <div className="release-kicker">
                            <span
                                className="release-kicker__mark"
                                aria-hidden="true"
                            />
                            Yii Framework / 22.0 preview
                        </div>

                        <h1 id="release-heading" className="release-title">
                            The Yii you know.
                            <span>Ready for what ships next.</span>
                        </h1>

                        <p className="release-lede">
                            A leaner Yii2 core for modern PHP, paired with
                            Inertia, React 19, and Vite. Keep the server-side
                            architecture you trust and move through the
                            interface at application speed.
                        </p>

                        <div className="release-actions">
                            <a
                                className="release-button release-button--primary"
                                href="#new-in-22"
                            >
                                Explore 22.0
                            </a>
                            <Link
                                className="release-button release-button--quiet"
                                href={accountDemo.href}
                                prefetch
                            >
                                Run the application
                            </Link>
                        </div>

                        <p className="release-note">
                            22.0 is under active development and intended for
                            evaluation.
                        </p>
                    </div>

                    <div
                        className="runtime-window"
                        aria-label="Application request flow"
                    >
                        <div className="runtime-window__bar">
                            <div className="runtime-window__status">
                                <span aria-hidden="true" />
                                Runtime connected
                            </div>
                            <span>localhost:8081</span>
                        </div>

                        <div className="runtime-window__body">
                            <div className="runtime-request">
                                <span>GET</span>
                                <strong>/</strong>
                                <small>Inertia response</small>
                            </div>

                            <div className="runtime-path" aria-hidden="true">
                                <span className="runtime-path__line runtime-path__line--blue" />
                                <span className="runtime-path__line runtime-path__line--green" />
                                <span className="runtime-path__line runtime-path__line--orange" />
                            </div>

                            <ol className="runtime-stack">
                                <li>
                                    <span>01</span>
                                    <strong>PHP 8.3+</strong>
                                    <small>request</small>
                                </li>
                                <li>
                                    <span>02</span>
                                    <strong>Yii 22</strong>
                                    <small>response</small>
                                </li>
                                <li>
                                    <span>03</span>
                                    <strong>Inertia 3</strong>
                                    <small>protocol</small>
                                </li>
                                <li>
                                    <span>04</span>
                                    <strong>React 19</strong>
                                    <small>interface</small>
                                </li>
                            </ol>

                            <div className="runtime-window__footer">
                                <code>
                                    {"return $this->inertia('Site/Index');"}
                                </code>
                                <span>Vite HMR ready</span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="release-spec" aria-label="Technology versions">
                    <div>
                        <span>Framework</span>
                        <strong>{runtime.framework}</strong>
                    </div>
                    <div>
                        <span>Runtime</span>
                        <strong>PHP {runtime.php}</strong>
                    </div>
                    <div>
                        <span>Navigation</span>
                        <strong>Inertia 3</strong>
                    </div>
                    <div>
                        <span>Interface</span>
                        <strong>React 19</strong>
                    </div>
                    <div>
                        <span>Tooling</span>
                        <strong>Vite 8</strong>
                    </div>
                </div>

                <section
                    id="new-in-22"
                    className="landing-section change-section"
                    aria-labelledby="changes-heading"
                >
                    <div className="section-intro">
                        <div>
                            <span className="section-label">
                                What’s new in 22.0
                            </span>
                            <h2 id="changes-heading">
                                The branch makes its case in code.
                            </h2>
                        </div>
                        <p>
                            Two framework-level APIs show the direction clearly:
                            smaller HTTP units, stronger dependency injection,
                            and query controls that operate where developers
                            expect them to.
                        </p>
                    </div>

                    <div id="release-dossier" className="release-dossier">
                        <header className="release-dossier__masthead">
                            <div className="release-dossier__branch">
                                <span aria-hidden="true" />
                                <strong>22.0 change register</strong>
                            </div>
                            <code>
                                2 framework proofs · 3 foundation shifts
                            </code>
                            <a
                                href="https://github.com/yiisoft/yii2/blob/22.0/framework/UPGRADE-22.md"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Full upgrade guide
                                <span aria-hidden="true">↗</span>
                            </a>
                        </header>

                        <div className="release-dossier__proofs">
                            {releaseProofs.map((proof) => (
                                <article
                                    id={proof.id}
                                    key={proof.id}
                                    className="release-proof"
                                    data-accent={proof.accent}
                                >
                                    <div
                                        className="release-proof__index"
                                        aria-hidden="true"
                                    >
                                        {proof.index}
                                    </div>

                                    <div className="release-proof__copy">
                                        <div className="release-proof__meta">
                                            <span>{proof.area}</span>
                                            <code>{proof.signal}</code>
                                        </div>
                                        <h3>{proof.title}</h3>
                                        <p>{proof.description}</p>

                                        <dl className="release-proof__facts">
                                            {proof.facts.map((fact) => (
                                                <div key={fact.label}>
                                                    <dt>{fact.label}</dt>
                                                    <dd>{fact.value}</dd>
                                                </div>
                                            ))}
                                        </dl>

                                        <a
                                            className="release-proof__reference"
                                            href={proof.href}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Read the upstream reference
                                            <span aria-hidden="true">↗</span>
                                        </a>
                                    </div>

                                    <figure className="release-code">
                                        <figcaption>
                                            <span>{proof.file}</span>
                                            <code>{proof.request}</code>
                                        </figcaption>
                                        <pre
                                            aria-label={`${proof.area} code example`}
                                        >
                                            <code>
                                                {proof.code.map(
                                                    (line, lineIndex) => (
                                                        <span
                                                            key={`${proof.id}-${lineIndex}`}
                                                            className={`release-code__line${line.emphasis ? " release-code__line--emphasis" : ""}`}
                                                            data-line={String(
                                                                lineIndex + 1,
                                                            ).padStart(2, "0")}
                                                        >
                                                            {line.text}
                                                        </span>
                                                    ),
                                                )}
                                            </code>
                                        </pre>
                                        <p>{proof.note}</p>
                                    </figure>
                                </article>
                            ))}
                        </div>

                        <div className="release-foundation">
                            <div className="release-foundation__intro">
                                <span>Foundation shift</span>
                                <strong>Modern defaults below the API.</strong>
                            </div>

                            {foundationChanges.map((change) => (
                                <article
                                    key={change.area}
                                    data-accent={change.accent}
                                >
                                    <div className="release-foundation__meta">
                                        <span>{change.area}</span>
                                        <code>{change.signal}</code>
                                    </div>
                                    <h3>{change.title}</h3>
                                    <p>{change.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="stack" className="landing-section stack-section">
                    <div className="section-intro section-intro--stack">
                        <div>
                            <span className="section-label">
                                One request, one application
                            </span>
                            <h2>
                                Server-driven.
                                <br />
                                Interface-forward.
                            </h2>
                        </div>
                        <p>
                            Yii still owns routing, controllers, data, and
                            validation. Inertia turns the response into a page
                            contract, while React handles the part your users
                            touch.
                        </p>
                    </div>

                    <div className="stack-workbench">
                        <ol className="stack-rail">
                            {stack.map((layer, index) => (
                                <li key={layer.name}>
                                    <div className="stack-rail__index">
                                        0{index + 1}
                                    </div>
                                    <div className="stack-rail__copy">
                                        <span>{layer.role}</span>
                                        <strong>{layer.name}</strong>
                                        <p>{layer.detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <div className="request-proof">
                            <div className="request-proof__header">
                                <div>
                                    <span className="request-proof__eyebrow">
                                        Live partial reload
                                    </span>
                                    <h3>Replay the server request.</h3>
                                </div>
                                <button
                                    type="button"
                                    disabled={refreshing}
                                    aria-busy={refreshing}
                                    onClick={replayRequest}
                                >
                                    {refreshing
                                        ? "Requesting…"
                                        : "Replay request"}
                                </button>
                            </div>

                            <div
                                className="request-proof__readout"
                                aria-live="polite"
                            >
                                <div>
                                    <span>Request ID</span>
                                    <code>{runtime.requestId}</code>
                                </div>
                                <div>
                                    <span>Served at</span>
                                    <code>{runtime.servedAt}</code>
                                </div>
                                <div>
                                    <span>Payload</span>
                                    <code>runtime only</code>
                                </div>
                            </div>

                            <pre className="request-proof__code">
                                <code>
                                    <span className="code-muted">
                                        // SiteController.php
                                    </span>
                                    {"\n"}
                                    <span className="code-blue">
                                        return
                                    </span>{" "}
                                    <span className="code-white">$this</span>
                                    {"->inertia(\n    "}
                                    <span className="code-green">
                                        'Site/Index'
                                    </span>
                                    {",\n    ["}
                                    <span className="code-green">
                                        'runtime'
                                    </span>
                                    {" => "}
                                    <span className="code-white">$runtime</span>
                                    {"],\n);"}
                                </code>
                            </pre>

                            <p className="request-proof__note">
                                Only the <code>runtime</code> prop travels over
                                the wire. Page state and scroll position stay
                                intact.
                            </p>
                        </div>
                    </div>

                    <div
                        id="inertia-scroll"
                        className="protocol-proof"
                        aria-labelledby="protocol-proof-title"
                    >
                        <div className="protocol-proof__copy">
                            <span className="protocol-proof__eyebrow">
                                php-forge/inertia · live scroll
                            </span>
                            <h3 id="protocol-proof-title">
                                Scroll. Fetch. Merge. Stay put.
                            </h3>
                            <p>
                                Move through the trace. When the boundary enters
                                view, Inertia requests only the next slice and
                                the PHP core marks{" "}
                                <code>protocolFeed.data</code> for append.
                            </p>

                            <div className="protocol-proof__contract">
                                <span>Server contract</span>
                                <pre>
                                    <code>
                                        <span className="code-blue">
                                            Inertia
                                        </span>
                                        {"::scroll(\n    "}
                                        <span className="code-white">
                                            $page
                                        </span>
                                        {",\n    "}
                                        <span className="code-blue">
                                            new
                                        </span>{" "}
                                        <span className="code-green">
                                            ScrollMetadata
                                        </span>
                                        {"(\n        "}
                                        <span className="code-green">
                                            'protocol'
                                        </span>
                                        {", "}
                                        <span className="code-white">
                                            $prev
                                        </span>
                                        {", "}
                                        <span className="code-white">
                                            $next
                                        </span>
                                        {", "}
                                        <span className="code-white">
                                            $current
                                        </span>
                                        {",\n    ),\n);"}
                                    </code>
                                </pre>
                            </div>

                            <dl className="protocol-proof__meta">
                                <div>
                                    <dt>Prop</dt>
                                    <dd>
                                        <code>protocolFeed</code>
                                    </dd>
                                </div>
                                <div>
                                    <dt>Merge path</dt>
                                    <dd>
                                        <code>protocolFeed.data</code>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="protocol-scroll">
                            <div className="protocol-scroll__bar">
                                <div id="protocol-trace-label">
                                    <span aria-hidden="true" />
                                    Protocol trace
                                </div>
                                <code>
                                    {protocolFeed.data.length} /{" "}
                                    {protocolFeed.total} signals
                                </code>
                            </div>

                            <div
                                className="protocol-scroll__viewport"
                                scroll-region=""
                                tabIndex={0}
                                role="region"
                                aria-labelledby="protocol-trace-label"
                            >
                                <InfiniteScroll
                                    data="protocolFeed"
                                    as="ol"
                                    className="protocol-scroll__items"
                                    buffer={24}
                                    onlyNext
                                    next={({ loading, hasMore }) => (
                                        <div
                                            className="protocol-scroll__status"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            <span aria-hidden="true" />
                                            {loading
                                                ? "Requesting the next slice…"
                                                : hasMore
                                                  ? "Scroll to cross the next boundary"
                                                  : "Protocol trace complete"}
                                        </div>
                                    )}
                                >
                                    {protocolFeed.data.map((event) => (
                                        <li
                                            key={event.id}
                                            className="protocol-scroll__item"
                                            data-accent={event.accent}
                                        >
                                            <div className="protocol-scroll__index">
                                                {String(event.id).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </div>
                                            <div>
                                                <span>{event.layer}</span>
                                                <strong>{event.title}</strong>
                                                <p>{event.detail}</p>
                                            </div>
                                        </li>
                                    ))}
                                </InfiniteScroll>
                            </div>

                            <div className="protocol-scroll__footer">
                                <code>{url}</code>
                                <code>
                                    loaded through {protocolFeed.page} /{" "}
                                    {protocolFeed.pages}
                                </code>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="demo" className="landing-section demo-section">
                    <div className="section-intro">
                        <div>
                            <span className="section-label">
                                Working reference app
                            </span>
                            <h2>
                                Do not just read it.
                                <br />
                                Follow the flow.
                            </h2>
                        </div>
                        <p>
                            Every path below opens a real part of the
                            application. Use them to trace how Yii, Inertia, and
                            React share responsibility from request to
                            interface.
                        </p>
                    </div>

                    <div
                        className={`demo-grid${
                            demos.length === 2 ? " demo-grid--compact" : ""
                        }`}
                    >
                        {demos.map((demo) => (
                            <article key={demo.title} className="demo-card">
                                <span>{demo.eyebrow}</span>
                                <h3>{demo.title}</h3>
                                <p>{demo.description}</p>
                                {demo.inertia ? (
                                    <Link href={demo.href} prefetch>
                                        {demo.label}
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                ) : (
                                    <a
                                        href={demo.href}
                                        rel={
                                            demo.external
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        target={
                                            demo.external ? "_blank" : undefined
                                        }
                                    >
                                        {demo.label}
                                        <span aria-hidden="true">
                                            {demo.external ? "↗" : "→"}
                                        </span>
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className="release-cta"
                    aria-labelledby="release-cta-heading"
                >
                    <div>
                        <span className="section-label">
                            Evaluate the next line
                        </span>
                        <h2 id="release-cta-heading">
                            Build forward without starting over.
                        </h2>
                    </div>
                    <p>
                        Read the migration notes, inspect the branch, then use
                        this application as a working map for a modern Yii2
                        stack.
                    </p>
                    <div className="release-actions">
                        <a
                            className="release-button release-button--light"
                            href="https://github.com/yiisoft/yii2/blob/22.0/framework/UPGRADE-22.md"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Read the upgrade guide
                        </a>
                        <a
                            className="release-button release-button--outline-light"
                            href="https://github.com/yiisoft/yii2/tree/22.0"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Browse branch 22.0
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
}
