import { Box } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { Outlet } from "react-router";
import { LandingFooter } from "~/components/layout/footer";
import { LandingHeader } from "~/components/layout/header";
import { useAuth } from "~/contexts/auth.context";
import { LocalStorageCartItems } from "~/pages/cart/types";

const AppWrapper: React.FC = () => {
    const { user } = useAuth();
    const [_, saveLocalCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

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
        <Box className={`flex min-h-screen w-full flex-col`}>
            <LandingHeader />
            <main className="container mx-auto my-3 flex-grow">
                <Outlet />
            </main>
            <LandingFooter />
        </Box>
    );
};

export default AppWrapper;
