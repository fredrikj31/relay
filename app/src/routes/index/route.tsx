import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "./components/Navbar";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <Navbar />
    </main>
  );
}
