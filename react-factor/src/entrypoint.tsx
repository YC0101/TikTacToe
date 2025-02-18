import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Select element id = react-root
const rootElement = document.getElementById("react-root");
// react root
const root = createRoot(rootElement!);

// Need to transpile to load in the page
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
