import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NavbarProvider } from "../providers/navbar";

const RootLayout = () => (
  <>
    <NavbarProvider>
      <Outlet />
    </NavbarProvider>
    <TanStackRouterDevtools position="bottom-right" />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
