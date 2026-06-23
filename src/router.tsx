import { QueryClient } from "@tanstack/react-query";
import { createRouter, createHashHistory } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  // On crée un historique basé sur le "Hash" (#) adapté à l'hébergement statique GitHub Pages
  const hashHistory = createHashHistory();

  const router = createRouter({
    routeTree,
    history: hashHistory, // <--- Injection cruciale ici
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
