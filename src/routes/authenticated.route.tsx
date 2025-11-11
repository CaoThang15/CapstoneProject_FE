import { Outlet, Route } from "react-router";
import { Role } from "~/constants/roles";
import AuthenticatedGuard from "~/guards/authenticated.guard";
import CartPage from "~/pages/cart/cart-page";
import { CheckoutProvider } from "~/pages/checkout/checkout.context";
import CheckoutPage from "~/pages/checkout/checkout.page";
import LandingBackground from "~/pages/landing";
import { ProfilePage } from "~/pages/profile";
import OrderDetailPage from "~/pages/profile/order-management/order-detail.page";
import OrderManagementPage from "~/pages/profile/order-management/order-management.page";
import SellerOrderDetailPage from "~/pages/seller/order-management/order-detail.page";
import SellerOrderManagementPage from "~/pages/seller/order-management/order-management.page";
import CreateProductPage from "~/pages/seller/product-management/create-product.page";
import ProductManagementPage from "~/pages/seller/product-management/product-management.page";
import UpdateProductPage from "~/pages/seller/product-management/update-product.page";
import { AppWrapper, ManagerWrapper, ProfileWrapper } from "~/wrapper";

export const AuthenticatedRoutes = (
    <Route>
        <Route element={<AuthenticatedGuard />}>
            <Route element={<AppWrapper />}>
                <Route
                    element={
                        <CheckoutProvider>
                            <Outlet />
                        </CheckoutProvider>
                    }
                >
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                </Route>
            </Route>
            <Route element={<ProfileWrapper />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="orders">
                    <Route index element={<OrderManagementPage />} />
                    <Route path=":id" element={<OrderDetailPage />} />
                </Route>
            </Route>
        </Route>
        <Route element={<ManagerWrapper />}>
            <Route path="/seller" element={<AuthenticatedGuard role={Role.Seller} />}>
                <Route index element={<LandingBackground />} />
                <Route path="dashboard" element={<LandingBackground />} />
                <Route path="orders">
                    <Route index element={<SellerOrderManagementPage />} />
                    <Route path=":id" element={<SellerOrderDetailPage />} />
                </Route>
                <Route path="products">
                    <Route index element={<ProductManagementPage />} />
                    <Route path="create" element={<CreateProductPage />} />
                    <Route path="update/:id" element={<UpdateProductPage />} />
                </Route>
            </Route>
            <Route path="/admin" element={<AuthenticatedGuard role={Role.Admin} />}>
                <Route index element={<div>Admin Page</div>} />
            </Route>
        </Route>
    </Route>
);
