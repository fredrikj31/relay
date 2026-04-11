import { BrowserRouter } from "react-router";
import { NavbarProvider } from "./providers/navbar";
export const App = () => {
  return (
    <BrowserRouter>
      <NavbarProvider>
        <h1>Hej med dig</h1>
      </NavbarProvider>
    </BrowserRouter>
  );
};
