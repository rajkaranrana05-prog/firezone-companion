import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import Characters from "@/pages/Characters";
import Home from "@/pages/Home";
import Tips from "@/pages/Tips";
import Weapons from "@/pages/Weapons";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => <Layout />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const charactersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/characters",
  component: Characters,
});

const weaponsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/weapons",
  component: Weapons,
});

const tipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tips",
  component: Tips,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  charactersRoute,
  weaponsRoute,
  tipsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
