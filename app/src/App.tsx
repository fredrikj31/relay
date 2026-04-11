import { BrowserRouter, Route, Routes } from "react-router";
import { NavbarProvider } from "./providers/navbar";
import { SignupRoute } from "./routes/signup/route";
export const App = () => {
  return (
    <BrowserRouter>
      <NavbarProvider>
        <Routes>
          <Route path="/signup" element={<SignupRoute />} />
        </Routes>
      </NavbarProvider>
    </BrowserRouter>
  );
};
