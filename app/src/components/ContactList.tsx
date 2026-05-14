import { useMemo, useRef, useState } from "react";
import { cn } from "@shadcn-ui/lib/utils";
import {
  Search,
  PanelLeftOpen,
  UserPlus,
  AtSignIcon,
  XIcon,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { useNavbar } from "../providers/navbar";
import { Button } from "@shadcn-ui/components/ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import { useListContacts } from "../api/contacts/listContacts/useListContacts";
import { Contact } from "../types/Contact";
import { Account } from "../types/Account";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@shadcn-ui/components/ui/input-group";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcn-ui/components/ui/tabs";
import { Badge } from "@shadcn-ui/components/ui/badge";
import { useListSentContactRequests } from "../api/contacts/listSentContactRequests/useListSentContactRequests";

export function ContactList() {
  const [searchQuery, setSearchQuery] = useState("");
  const addContactInputRef = useRef<HTMLInputElement>(null);

  const { setIsNavbarOpen } = useNavbar();
  const { data: contacts } = useListContacts();
  const { data: sentContactRequests } = useListSentContactRequests();

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];

    return contacts.filter((c) =>
      (c.account.firstName + " " + c.account.lastName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    );
  }, [contacts]);

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

      <Tabs defaultValue="contacts" className="px-5">
        <TabsList className="w-full">
          <TabsTrigger className="hover:cursor-pointer" value="contacts">
            All Contacts
          </TabsTrigger>
          <TabsTrigger className="hover:cursor-pointer" value="requests">
            Requests <Badge>3</Badge>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          {/* Search */}
          <div className="pb-3">
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
          <div className="py-3 border border-y border-border border-x-0">
            <span className="text-neutral-500 text-xs uppercase font-semibold">
              Add by handle
            </span>
            <div className="flex flex-row gap-2 items-center">
              <InputGroup>
                <InputGroupInput
                  ref={addContactInputRef}
                  type="text"
                  placeholder="JohnDoe"
                />
                <InputGroupAddon align="inline-start">
                  <AtSignIcon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
              <Button>
                <UserPlus />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredContacts.length === 0 ? (
              <p className="px-5 py-6 text-sm text-muted-foreground">
                No contacts found.
              </p>
            ) : (
              <ul role="list">
                {filteredContacts.map((contact) => (
                  <ContactListItem key={contact.id} contact={contact} />
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="requests"
          className="flex flex-col gap-2 min-h-full"
        >
          <span className="text-neutral-500 text-xs uppercase font-semibold">
            Received - 3
          </span>

          <ul role="list">
            <li className="flex w-full flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                {/* Avatar */}
                <Avatar className="size-11">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    Jane Doe
                  </span>
                  <span className="text-xs text-muted-foreground">
                    @JaneDoe
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 justify-end w-full">
                <Button className="hover:cursor-pointer" variant="outline">
                  <XIcon /> Decline
                </Button>
                <Button className="hover:cursor-pointer" variant="default">
                  <UserCheck /> Accept
                </Button>
              </div>
            </li>
          </ul>

          <span className="text-neutral-500 text-xs uppercase font-semibold">
            Sent - {sentContactRequests?.length ?? 0}
          </span>

          <ul role="list" className="flex flex-col gap-4">
            {(sentContactRequests ?? []).map((sentContactRequest) => {
              const { account } = sentContactRequest;
              return (
                <li
                  key={sentContactRequest.id}
                  className="flex w-full flex-col gap-2"
                >
                  <div className="flex flex-row items-center gap-2">
                    {/* Avatar */}
                    <Avatar className="size-11">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {account.firstName} {account.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        @{account.username}
                      </span>
                    </div>
                  </div>
                  <Button
                    className="hover:cursor-pointer w-full"
                    variant="destructive"
                  >
                    <UserMinus /> Cancel
                  </Button>
                </li>
              );
            })}
          </ul>
        </TabsContent>
      </Tabs>
    </aside>
  );
}

function ContactListItem({
  contact,
}: {
  contact: Pick<Contact, "id" | "createdAt" | "updatedAt" | "deletedAt"> & {
    account: Pick<Account, "id" | "username" | "firstName" | "lastName">;
  };
  // TODO: isOnline: boolean
}) {
  const { firstName, lastName, username } = contact.account;
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
            className={cn("bg-green-600 dark:bg-green-800", {
              // "bg-green-600 dark:bg-green-800": isOnline,
              // "bg-neutral-600 dark:bg-neutral-800": !isOnline,
            })}
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {firstName} {lastName}
          </span>
          <span className="text-xs text-muted-foreground">@{username}</span>
        </div>
      </button>
    </li>
  );
}
