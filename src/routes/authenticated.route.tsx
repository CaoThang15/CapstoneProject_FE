import { Route } from "react-router";
import { Role } from "~/constants/roles";
import AuthenticatedGuard from "~/guards/authenticated.guard";
import LandingBackground from "~/pages/landing";

export const AuthenticatedRoutes = (
    <Route>
        <Route path="/manage" element={<AuthenticatedGuard role={Role.Salesman} />}>
            <Route index element={<LandingBackground />} />
        </Route>
        <Route path="admin" element={<AuthenticatedGuard role={Role.Administrator} />}>
            <Route index element={<div>Admin Page</div>} />
        </Route>
    </Route>
);
