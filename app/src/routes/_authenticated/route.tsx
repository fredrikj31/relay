import { Navigate, Outlet } from "react-router";
import { useNavbar } from "../../providers/navbar";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../providers/auth";

export const AuthenticatedRouteLayout = () => {
  const { isNavbarOpen, setIsNavbarOpen } = useNavbar();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="relative flex h-screen overflow-hidden bg-background font-sans">
      {/* Backdrop — only on mobile when panel is open */}
      {isNavbarOpen && (
        <div
          className="absolute inset-0 z-20 bg-black/40 md:hidden"
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
};
