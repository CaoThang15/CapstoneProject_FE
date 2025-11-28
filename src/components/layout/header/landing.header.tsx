import { Category, Recycling, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Divider, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import classNames from "classnames";
import React from "react";
import { NotificationBell } from "~/components/common/notification";
import { useAuth } from "~/contexts/auth.context";
import { LocalStorageCartItems } from "~/pages/cart/types";
import UserSection from "./user-section";

const LandingHeader: React.FC = () => {
    const { user } = useAuth();
    const [localCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

    const handleNavigate = (href: string) => {
        window.location.href = href;
    };

    return (
        <AppBar position="sticky" sx={{ top: 0 }} className="shadow-m w-full justify-center bg-stone-100 px-3 py-2">
            <Box className="container mx-auto">
                <Stack>
                    <Box className="mb-2 flex items-center justify-between pb-1">
                        <Box className="flex items-center space-x-2 text-sm">
                            <Typography
                                variant="caption"
                                className="cursor-pointer text-center text-gray-500 hover:underline"
                                onClick={() => handleNavigate("/seller")}
                            >
                                Kênh Người Bán
                            </Typography>
                            <Divider orientation="vertical" flexItem className="mx-2" />
                            <Typography
                                variant="caption"
                                className="cursor-pointer text-center text-gray-500 hover:underline"
                                onClick={() => (window.location.href = "seller/on-boarding")}
                            >
                                Trở thành Người bán S-Market
                            </Typography>
                        </Box>
                        <UserSection />
                    </Box>
                    <Box className="flex basis-3/5 items-center justify-between">
                        <Stack
                            direction={"row"}
                            spacing={2}
                            alignItems="center"
                            className="cursor-pointer pe-4"
                            onClick={() => (window.location.href = "/")}
                        >
                            <IconButton disableRipple size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
                                <Recycling />
                            </IconButton>
                            <Typography variant="h5" fontWeight={700} className="w-1/2 whitespace-nowrap text-gray-600">
                                S-Market
                            </Typography>
                        </Stack>
                        <Stack
                            flexDirection="row"
                            className="ml-4 basis-2/5 space-x-5"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Tooltip title="Danh mục" arrow placement="bottom">
                                <IconButton
                                    className="h-9 border-none text-gray-600"
                                    onClick={() => handleNavigate("/category")}
                                >
                                    <Category fontSize="small" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Giỏ hàng" arrow placement="bottom">
                                <IconButton
                                    onClick={() => (window.location.href = "/cart")}
                                    className="h-9 border-none text-gray-600"
                                >
                                    <Badge
                                        badgeContent={Object.keys(localCartProducts).length}
                                        color="primary"
                                        overlap="circular"
                                        variant="standard"
                                        className={classNames({
                                            "me-3": Object.keys(localCartProducts).length > 0,
                                        })}
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                fontSize: 10,
                                                minWidth: 15,
                                                height: 15,
                                                right: -5,
                                            },
                                        }}
                                    >
                                        <ShoppingCart fontSize="small" />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            {/* Notification Bell */}
                            {user && <NotificationBell />}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </AppBar>
    );
};

export default LandingHeader;
