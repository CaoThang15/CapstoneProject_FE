import { lazy } from "react";
import { Route } from "react-router";
import HomePage from "~/pages/homepage/home.page";
import AppWrapper from "~/wrapper/app.wrapper";

const LoginPage = lazy(() => import("../pages/auth/login/login.page"));
const RegisterPage = lazy(() => import("../pages/auth/register/register.page"));
const ExamplePage = lazy(() => import("../pages/template/app"));
const TemplateForm = lazy(() => import("../pages/template/form"));
const TemplateLayout = lazy(() => import("../pages/template/layout"));
const CategoryPage = lazy(() => import("../pages/category/category.page"));
const ProductCategoryPage = lazy(() => import("../pages/category/(path)/product-category.page"));
const ProductDetailPage = lazy(() => import("../pages/product/product-detail.page"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/forgot-password/forgot-password.page"));

export const PublicRoutes = (
    <Route>
        <Route path="template">
            <Route path="app" element={<ExamplePage />} />
            <Route path="form" element={<TemplateForm />} />
            <Route path="layout" element={<TemplateLayout />} />
        </Route>
        <Route element={<AppWrapper />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route index element={<HomePage />} />
            <Route path="category">
                <Route index element={<CategoryPage />} />
                <Route path=":slug" element={<ProductCategoryPage />} />
            </Route>
            <Route path="product">
                <Route path=":id" element={<ProductDetailPage />} />
            </Route>
        </Route>
        <Route path="*" element={<div>Developing</div>} />
    </Route>
);
