import { Outlet, Route } from "react-router";
import { Role } from "~/constants/roles";
import AuthenticatedGuard from "~/guards/authenticated.guard";
import CategoryManagementPage from "~/pages/admin/category/category-mangement.page";
import AdminOrderDetailPage from "~/pages/admin/orders/order-detail.page";
import AdminOrderManagementPage from "~/pages/admin/orders/order-management.page";
import AdminProductManagementPage from "~/pages/admin/product/product-management.page";
import AdminUserManagementPage from "~/pages/admin/users/user-management.page";
import AdminVoucherManagementPage from "~/pages/admin/voucher/voucher-management.page";
import CartPage from "~/pages/cart/cart-page";
import { CheckoutProvider } from "~/pages/checkout/checkout.context";
import CheckoutPage from "~/pages/checkout/checkout.page";
import LandingBackground from "~/pages/landing";
import { ProfilePage } from "~/pages/profile";
import OrderDetailPage from "~/pages/profile/order-management/order-detail.page";
import OrderManagementPage from "~/pages/profile/order-management/order-management.page";
import VoucherManagementPage from "~/pages/profile/voucher-management/voucher-management.page";
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
            <Route path="user" element={<ProfileWrapper />}>
                <Route path="profile" element={<ProfilePage />} />
                <Route path="orders">
                    <Route index element={<OrderManagementPage />} />
                    <Route path=":id" element={<OrderDetailPage />} />
                </Route>
                <Route path="vouchers">
                    <Route index element={<VoucherManagementPage />} />
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
                <Route path="categorys" element={<CategoryManagementPage />} />
                <Route path="users" element={<AdminUserManagementPage />} />
                <Route path="products" element={<AdminProductManagementPage />} />
                <Route path="orders">
                    <Route index element={<AdminOrderManagementPage />} />
                    <Route path=":id" element={<AdminOrderDetailPage />} />
                </Route>

                <Route path="vouchers" element={<AdminVoucherManagementPage />} />
            </Route>
        </Route>
    </Route>
);
