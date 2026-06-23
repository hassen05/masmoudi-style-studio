import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

// Build a client‑only router (no SSR context needed)
const router = getRouter();

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Missing #root element for client entry");
}

const root = createRoot(rootEl);
root.render(<RouterProvider router={router} />);
