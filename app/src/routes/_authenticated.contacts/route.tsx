import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1>Contacts Page</h1>;
}
