import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory, createMemoryHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // Use memory history on server (SSR) and hash history in the browser
  const isServer = typeof window === 'undefined'
  const history = isServer ? createMemoryHistory({ initialEntries: ['/'] }) : createHashHistory()

  const router = createRouter({
    routeTree,
    history, // <--- Injection cruciale ici
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
