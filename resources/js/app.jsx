/**
 * Client entrypoint for the Yii2 + Inertia.js + React 19 reference app.
 *
 * Boots the Inertia React adapter against the `#app` root emitted by `yii\inertia\react\Bootstrap`, reads the initial
 * page payload from the inline `<script type="application/json">` element, wraps every resolved page in the shared
 * {@link Layout} component, and mounts the tree with React 19's `createRoot`. The inline JSON payload node is removed
 * before mounting to avoid hydration mismatches.
 *
 * Pages are resolved eagerly from `resources/js/Pages/**\/*.jsx` via Vite's `import.meta.glob`, so every page is part
 * of the production bundle and available synchronously at navigation time.
 *
 * @see https://inertiajs.com/client-side-setup
 */
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import Layout from "@/Components/Layout";

const appEl = document.getElementById("app");
const payloadEl = appEl?.querySelector('script[type="application/json"]');

if (!appEl || !payloadEl?.textContent) {
  throw new Error("Inertia bootstrap payload not found in `#app`.");
}

const pageData = JSON.parse(payloadEl.textContent);

// remove the bootstrap payload script so React's createRoot starts from a clean container.
payloadEl.remove();

createInertiaApp({
  id: "app",
  page: pageData,
  progress: {
    delay: 250,
    color: "#2f9abf",
    includeCSS: true,
    showSpinner: true,
  },
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    const page = pages[`./Pages/${name}.jsx`];

    if (!page) {
      throw new Error(`Page component "${name}" not found.`);
    }

    page.default.layout = page.default.layout ?? ((children) => createElement(Layout, null, children));

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(createElement(App, props));
  },
});
