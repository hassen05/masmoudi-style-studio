import AdminPage from "@/pages/admin";
import CollectionsPage from "@/pages/collections";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

import { SpaRouterProvider, useSpaRouter } from "@/lib/site-router";

function RoutedView() {
  const { route } = useSpaRouter();

  switch (route) {
    case "/":
      return <HomePage />;
    case "/collections":
      return <CollectionsPage />;
    case "/admin":
      return <AdminPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  return (
    <SpaRouterProvider>
      <RoutedView />
    </SpaRouterProvider>
  );
}
