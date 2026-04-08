import { createFileRoute } from "@tanstack/react-router";
import { MessageBubble } from "./components/-MessageBubble";
import { EllipsisVertical, PanelLeftOpen } from "lucide-react";
import { useNavbar } from "../../providers/navbar";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import { MessageList } from "../../components/MessagesList";

export const Route = createFileRoute("/_authenticated/messages/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setIsNavbarOpen } = useNavbar();

  return (
    <div className="flex flex-row w-full">
      <div className="md:block hidden">
        <MessageList />
      </div>
      <div className="flex-1 w-full overflow-y-auto">
        {/* Header */}
        <div className="flex flex-row items-center justify-between px-5 pt-6 pb-4">
          <div className="flex flex-row gap-4">
            <button
              className="size-8 md:hidden text-muted-foreground flex items-center justify-center"
              onClick={() => setIsNavbarOpen(true)}
            >
              <PanelLeftOpen size={18} />
            </button>
            <div className="flex flex-row gap-2">
              <Avatar className="group hover:cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                  className="group-hover:opacity-90"
                />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
              <div className="flex flex-col justify-start">
                <p className="text-sm font-semibold text-foreground">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </div>
          <button
            className="size-8 text-muted-foreground flex items-center justify-center"
            onClick={() => alert("Not Implemented!")}
          >
            <EllipsisVertical size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <MessageBubble isOwn={true} message={{ content: "Hello" }} />
          <MessageBubble isOwn={false} message={{ content: "World" }} />
          <MessageBubble
            isOwn={true}
            message={{
              content:
                "How are you? This is a very long message. How can it actually be. This is getting pretty long...",
            }}
          />
          <MessageBubble
            isOwn={false}
            message={{
              content:
                "How are you? This is a very long message. How can it actually be. This is getting pretty long... Let's test it on desktop. It needs to be very much long longer...",
            }}
          />
        </div>
      </div>
    </div>
  );
}
