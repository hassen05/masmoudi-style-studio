import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { createBrowserHistory , createMemoryHistory } from "@tanstack/history";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Use memory history on server (SSR) and hash history in the browser
  const isBrowser = typeof window !== 'undefined' && typeof window.history !== 'undefined' && typeof document !== 'undefined'
  const history = isBrowser ? createBrowserHistory () : createMemoryHistory({ initialEntries: ['/'] })

 const router = createRouter({
  routeTree,
  history,
  context: { queryClient },
  basepath: "/masmoudi-style-studio", // 🔥 ADD THIS
  scrollRestoration: true,
});

  return router;
};
