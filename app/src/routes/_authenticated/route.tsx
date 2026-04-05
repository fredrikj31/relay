import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../../components/Navbar";
import { useNavbar } from "../../providers/navbar";

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
  component: () => {
    const { isNavbarOpen, setIsNavbarOpen } = useNavbar();

    return (
      <main className="relative flex h-screen overflow-hidden bg-background font-sans">
        {/* Backdrop — only on mobile when panel is open */}
        {isNavbarOpen && (
          <div
            className="absolute inset-0 z-10 bg-black/40 md:hidden"
            onClick={() => setIsNavbarOpen(false)}
            aria-hidden="true"
          />
        )}
        <Navbar isNavbarOpen={isNavbarOpen} />
        <div className="flex flex-1 overflow-hidden">
          <Outlet />
        </div>
      </main>
    );
  },
});
