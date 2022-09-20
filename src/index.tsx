import "modern-normalize/modern-normalize.css";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";

const rootEl = document.getElementById("root") as HTMLElement;
const isHydration = rootEl.children.length > 0;

if (isHydration) {
  hydrateRoot(rootEl, <App />);
} else {
  const reactRoot = createRoot(rootEl);
  reactRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
