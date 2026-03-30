import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../../components/Navbar";

export const Route = createFileRoute("/_authenticated")({
  // TODO: Add authentication check
  // beforeLoad: ({ context, location }) => {
  //   if (!context.auth.isAuthenticated) {
  //     throw redirect({
  //       to: '/login',
  //       search: { redirect: location.href },
  //     })
  //   }
  // },
  component: () => (
    <main className="flex h-screen overflow-hidden bg-background">
      <Navbar />
      <Outlet />
    </main>
  ),
});
