import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@shadcn-ui/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@shadcn-ui/components/ui/popover";
import { cn } from "@shadcn-ui/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Archive,
  House,
  LucideProps,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { FileRoutesByTo } from "src/routeTree.gen";

const NAV_ITEMS: {
  id: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  link: keyof FileRoutesByTo;
  position: "top" | "bottom";
}[] = [
  { id: "home", icon: House, label: "Home", link: "/", position: "top" },
  {
    id: "messages",
    icon: MessageCircle,
    label: "Messages",
    link: "/messages",
    position: "top",
  },
  {
    id: "contacts",
    icon: Users,
    label: "Contacts",
    link: "/contacts",
    position: "top",
  },
  {
    id: "archived",
    icon: Archive,
    label: "Archived",
    link: "/archive",
    position: "top",
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    link: "/settings",
    position: "bottom",
  },
];

const NavbarItem = ({
  link,
  label,
  Icon,
  isActive,
}: {
  link: string;
  label: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  isActive: boolean;
}) => {
  return (
    <Link
      to={link}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      {/* Active pill on the left edge */}
      {isActive && (
        <span className="absolute -left-3 h-5 w-1 rounded-r-full bg-primary" />
      )}
      <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
    </Link>
  );
};

export const Navbar = () => {
  const location = useLocation();

  return (
    <aside className="flex h-screen w-16 shrink-0 flex-col items-center border-r border-border bg-sidebar py-3">
      {/* Top nav icons */}
      <nav
        className="flex flex-1 flex-col items-center gap-1 pt-1"
        aria-label="Main navigation"
      >
        {NAV_ITEMS.filter((item) => item.position === "top").map(
          ({ id, icon: Icon, label, link }) => {
            const isActive = location.pathname === link;
            return (
              <NavbarItem
                key={id}
                link={link}
                label={label}
                Icon={Icon}
                isActive={isActive}
              />
            );
          },
        )}
      </nav>

      {/* Bottom: settings + avatar */}
      <div className="flex flex-col items-center gap-3 pb-1">
        {NAV_ITEMS.filter((item) => item.position === "bottom").map(
          ({ id, icon: Icon, label, link }) => {
            const isActive = location.pathname === link;
            return (
              <NavbarItem
                key={id}
                link={link}
                label={label}
                Icon={Icon}
                isActive={isActive}
              />
            );
          },
        )}

        {/* Profile avatar with online dot */}
        <Popover>
          <PopoverTrigger>
            <Avatar className="group hover:cursor-pointer">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="group-hover:opacity-90"
              />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent align="end">
            <PopoverHeader>
              <PopoverTitle>Title</PopoverTitle>
              <PopoverDescription>Description text here.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
};
