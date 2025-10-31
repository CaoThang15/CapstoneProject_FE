import { Route } from "react-router";
import { Role } from "~/constants/roles";
import AuthenticatedGuard from "~/guards/authenticated.guard";
import LandingBackground from "~/pages/landing";
import { ProfilePage } from "~/pages/profile";
import CreateProductPage from "~/pages/seller/product-management/create-product.page";
import ProductManagementPage from "~/pages/seller/product-management/product-management.page";
import { ManagerWrapper, ProfileWrapper } from "~/wrapper";

export const AuthenticatedRoutes = (
    <Route>
        <Route element={<AuthenticatedGuard />}>
            <Route element={<ProfileWrapper />}>
                <Route path="profile" element={<ProfilePage />} />
            </Route>
        </Route>
        <Route element={<ManagerWrapper />}>
            <Route path="/seller" element={<AuthenticatedGuard role={Role.Seller} />}>
                <Route index element={<LandingBackground />} />
                <Route path="dashboard" element={<LandingBackground />} />
                <Route path="products">
                    <Route index element={<ProductManagementPage />} />
                    <Route path="create" element={<CreateProductPage />} />
                </Route>
            </Route>
            <Route path="/admin" element={<AuthenticatedGuard role={Role.Admin} />}>
                <Route index element={<div>Admin Page</div>} />
            </Route>
        </Route>
    </Route>
);
