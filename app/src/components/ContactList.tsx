import { useRef, useState } from "react";
import { cn } from "@shadcn-ui/lib/utils";
import { Search, PanelLeftOpen, UserPlus } from "lucide-react";
import { useNavbar } from "../providers/navbar";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";

export function ContactList() {
  const { setIsNavbarOpen } = useNavbar();
  const [searchQuery, setSearchQuery] = useState("");
  const addContactInputRef = useRef<HTMLInputElement>(null);

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
          Contacts
        </h1>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-muted pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition"
          />
        </div>
      </div>

      {/* Add Contact */}
      <div className="py-3 px-4 border border-y border-border border-x-0">
        <span className="text-neutral-500 text-xs uppercase font-semibold">
          Add by handle
        </span>
        <div className="flex flex-row gap-2 items-center">
          <div className="relative">
            <UserPlus
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              ref={addContactInputRef}
              type="text"
              placeholder="@username"
              className="w-full rounded-lg bg-muted pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-ring transition"
            />
          </div>
          <Button>
            <UserPlus />
          </Button>
        </div>
      </div>

      {/* Online list */}
      <div className="flex flex-col py-3">
        <span className="text-neutral-500 text-xs uppercase font-semibold mx-4">
          Online - 3
        </span>
        <div className="flex-1 overflow-y-auto">
          {/* {filteredContacts.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">
              No contacts found.
            </p>
          ) : ( */}
          <ul role="list">
            {new Array(3).fill(null).map((_, index) => (
              <ContactListItem key={index} isOnline={true} />
            ))}
          </ul>
        </div>
      </div>

      {/* Offline list */}
      <div className="flex flex-col">
        <span className="text-neutral-500 text-xs uppercase font-semibold mx-4">
          Offline - 4
        </span>
        <div className="flex-1 overflow-y-auto">
          {/* {filteredContacts.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">
              No contacts found.
            </p>
          ) : ( */}
          <ul role="list">
            {new Array(5).fill(null).map((_, index) => (
              <ContactListItem key={index} isOnline={false} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

function ContactListItem({ isOnline }: { isOnline: boolean }) {
  return (
    <li>
      <button
        className={cn(
          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/60",
        )}
      >
        {/* Avatar */}
        <Avatar className="size-11">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
          <AvatarBadge
            className={cn({
              "bg-green-600 dark:bg-green-800": isOnline,
              "bg-neutral-600 dark:bg-neutral-800": !isOnline,
            })}
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            Sarah Mitchell
          </span>
          <span className="text-xs text-muted-foreground">@sarah.m</span>
        </div>
      </button>
    </li>
  );
}
