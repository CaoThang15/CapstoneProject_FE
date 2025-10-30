import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Sidebar } from "~/components/layout/sidebar";
import { Spinner } from "~/components/layout/spinner";
import i18n from "~/configs/i18n";
import { Role } from "~/constants/roles";
import { tokenRefresher } from "~/libs/axios/axios-instance";
import { showToast } from "~/utils";
import { useAuth } from "../contexts/auth.context";

interface AuthenticatedGuardProps {
    role: Role;
}

const AuthenticatedGuard: React.FC<AuthenticatedGuardProps> = ({ role }) => {
    const { t } = useTranslation();
    const { user, isLoading, isInitialized } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    React.useEffect(() => {
        tokenRefresher.setNavigateFunction(navigate);
    }, [navigate]);

    React.useEffect(() => {
        if (!isInitialized || isLoading) {
            return;
        }

        if (!user) {
            sessionStorage.setItem("redirectUrl", location.pathname);
            showToast.warning(t(i18n.translationKey.pleaseLoginToContinue));
            navigate("/login");
            return;
        }

        if (user?.role === role) {
            showToast.warning(t(i18n.translationKey.accessDenied));
            navigate("/");
            return;
        }
    }, [navigate, location.pathname, isInitialized, isLoading, user]);

    if (!isInitialized || isLoading) {
        return <Spinner />;
    }

    return (
        <Box className="flex h-full">
            <Sidebar />
            <Box
                className={`h-full min-h-screen w-full flex-1 overflow-y-auto ${location.pathname !== "/" ? "p-2" : ""}`}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AuthenticatedGuard;
