import { Route } from "react-router";
import { Role } from "~/constants/roles";
import AuthenticatedGuard from "~/guards/authenticated.guard";
import LandingBackground from "~/pages/landing";
import ManagerWrapper from "~/wrapper/manager.wrapper";

export const AuthenticatedRoutes = (
    <Route>
        <Route path="/seller" element={<AuthenticatedGuard role={Role.Seller} />}>
            <Route element={<ManagerWrapper />}>
                <Route index element={<LandingBackground />} />
                <Route path="dashboard" element={<LandingBackground />} />
            </Route>
        </Route>
        <Route path="/admin" element={<AuthenticatedGuard role={Role.Admin} />}>
            <Route element={<ManagerWrapper />}>
                <Route index element={<div>Admin Page</div>} />
            </Route>
        </Route>
    </Route>
);
