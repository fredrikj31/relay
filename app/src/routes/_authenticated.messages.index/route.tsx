import { createFileRoute } from "@tanstack/react-router";
import { MessageList } from "../../components/MessagesList";

export const Route = createFileRoute("/_authenticated/messages/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MessageList />;
}
