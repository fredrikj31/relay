import { useState } from "react";
import { cn } from "@shadcn-ui/lib/utils";
import { Search, Edit, Users, PanelLeftOpen } from "lucide-react";
import { Conversation, conversations } from "../data/messages";
import { useNavbar } from "../../../providers/navbar";

export function MessageList() {
  const { setIsNavbarOpen } = useNavbar();
  const [query, setQuery] = useState("");

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <aside className="flex h-full w-full md:w-80 flex-col border-r border-border bg-sidebar shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button
          className="size-8 block md:hidden text-muted-foreground"
          onClick={() => setIsNavbarOpen(true)}
        >
          <PanelLeftOpen size={18} />
        </button>
        <h1 className="text-xl font-semibold text-sidebar-foreground tracking-tight">
          Messages
        </h1>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="New message"
        >
          <Edit size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg bg-muted pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="px-5 py-6 text-sm text-muted-foreground">
            No conversations found.
          </p>
        ) : (
          <ul role="list">
            {filtered.map((conv) => (
              <MessageListItem
                key={conv.id}
                conversation={conv}
                isActive={false}
              />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

function MessageListItem({
  conversation,
  isActive,
}: {
  conversation: Conversation;
  isActive: boolean;
}) {
  return (
    <li>
      <button
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/60",
          isActive && "bg-accent",
        )}
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {conversation.isGroup ? <Users size={18} /> : conversation.avatar}
          </div>
          {conversation.online && !conversation.isGroup && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-sidebar bg-online" />
          )}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span
              className={cn(
                "truncate text-sm",
                conversation.unread > 0
                  ? "font-semibold text-foreground"
                  : "font-medium text-foreground",
              )}
            >
              {conversation.name}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {conversation.timestamp}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs text-muted-foreground">
              {conversation.lastMessage}
            </p>
            {conversation.unread > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground shrink-0">
                {conversation.unread}
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}
