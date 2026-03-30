import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/archive")({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1>Archive Page</h1>;
}
