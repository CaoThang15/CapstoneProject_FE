import { Box } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { Outlet, useLocation } from "react-router";
import { ChatBox } from "~/components/common/chatbox";
import { LandingFooter } from "~/components/layout/footer";
import { LandingHeader } from "~/components/layout/header";
import { useAuth } from "~/contexts/auth.context";
import { LocalStorageCartItems } from "~/pages/cart/types";

const AppWrapper: React.FC = () => {
    const { user } = useAuth();
    const [_, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

    const location = useLocation();
    const isHomepage = location.pathname === "/";
    React.useEffect(() => {
        if (user) {
            saveLocalCartProducts((prev) => {
                const updatedCart = { ...prev };
                Object.keys(updatedCart).forEach((key) => {
                    if (updatedCart[key].sellerId === user.id) {
                        delete updatedCart[key];
                    }
                });
                return updatedCart;
            });
        }
    }, [user]);

    return (
        <Box className={`relative flex min-h-screen w-full flex-col`}>
            <LandingHeader />
            <main className={`${!isHomepage ? "pt-20" : "py-3"} flex-grow`}>
                <Box className="container mx-auto pb-3">
                    <Outlet />
                </Box>
                <LandingFooter />
            </main>
            <ChatBox />
        </Box>
    );
};

export default AppWrapper;
