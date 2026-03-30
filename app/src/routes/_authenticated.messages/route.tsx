import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/messages")({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1>Messages Page</h1>;
}
