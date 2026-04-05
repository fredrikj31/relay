import { createContext, ReactNode, useContext, useState } from "react";

type NavbarProviderProps = {
  children: ReactNode;
  defaultOpen?: boolean;
};

type NavbarProviderState = {
  isNavbarOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsNavbarOpen: (open: boolean) => void;
};

const initialState: NavbarProviderState = {
  isNavbarOpen: false,
  setIsNavbarOpen: () => null,
};

const NavbarProviderContext = createContext<NavbarProviderState>(initialState);

export function NavbarProvider({
  children,
  defaultOpen = false,
  ...props
}: NavbarProviderProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(defaultOpen);

  const value = {
    isNavbarOpen,
    setIsNavbarOpen,
  };

  return (
    <NavbarProviderContext.Provider {...props} value={value}>
      {children}
    </NavbarProviderContext.Provider>
  );
}

export const useNavbar = () => {
  const context = useContext(NavbarProviderContext);

  if (context === undefined)
    throw new Error("useNavbar must be used within a NavbarProvider");

  return context;
};
