import { BrowserRouter, Route, Routes } from "react-router";
import { NavbarProvider } from "./providers/navbar";
import { SignupRoute } from "./routes/signup/route";
import { LoginRoute } from "./routes/login/route";
import { AuthenticatedRouteLayout } from "./routes/_authenticated/route";
import { ContactsRoute } from "./routes/_authenticated.contacts/route";
import { ArchiveRoute } from "./routes/_authenticated.archive/route";
import { SettingsRoute } from "./routes/_authenticated.settings/route";
import { IndexRoute } from "./routes/_authenticated.index/route";
import { MessagesIndexRoute } from "./routes/_authenticated.messages.index/route";
import { MessagesContentRoute } from "./routes/_authenticated.messages.$id/route";

export const App = () => {
  return (
    <BrowserRouter>
      <NavbarProvider>
        <Routes>
          <Route path="/signup" element={<SignupRoute />} />
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/" element={<AuthenticatedRouteLayout />}>
            <Route index element={<IndexRoute />} />
            <Route path="messages">
              <Route index element={<MessagesIndexRoute />} />
              <Route path=":id" element={<MessagesContentRoute />} />
            </Route>
            <Route path="/contacts" element={<ContactsRoute />} />
            <Route path="/archive" element={<ArchiveRoute />} />
            <Route path="/settings" element={<SettingsRoute />} />
          </Route>
        </Routes>
      </NavbarProvider>
    </BrowserRouter>
  );
};
