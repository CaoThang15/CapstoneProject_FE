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
            <Route index element={<HomePage />} />
            <Route path="category">
                <Route index element={<CategoryPage />} />
            </Route>
        </Route>
        <Route path="*" element={<div>Developing</div>} />
    </Route>
);
