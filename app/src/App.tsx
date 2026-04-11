import { BrowserRouter, Route, Routes } from "react-router";
import { NavbarProvider } from "./providers/navbar";
import { SignupRoute } from "./routes/signup/route";
import { LoginRoute } from "./routes/login/route";
import { AuthenticatedRouteLayout } from "./routes/_authenticated/route";

export const App = () => {
  return (
    <BrowserRouter>
      <NavbarProvider>
        <Routes>
          <Route path="/signup" element={<SignupRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/" element={<AuthenticatedRouteLayout />}></Route>
        </Routes>
      </NavbarProvider>
    </BrowserRouter>
  );
};
