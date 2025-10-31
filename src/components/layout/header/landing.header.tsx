import { Category, Home, LoginOutlined, Recycling, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import classNames from "classnames";
import React from "react";
import { LocalStorageCartItems } from "~/pages/cart/types";

const LandingHeader: React.FC = () => {
    const [localCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);

    const handleNavigate = (href: string) => {
        window.location.href = href;
    };

    return (
        <AppBar position="sticky" sx={{ top: 0 }} className="shadow-m w-full justify-center bg-white px-3 py-2">
            <Box className="container mx-auto">
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
                        <Typography variant="h6" className="w-1/2 whitespace-nowrap text-gray-600">
                            S-Market
                        </Typography>
                    </Stack>
                    <Stack
                        flexDirection="row"
                        className="ml-4 basis-2/5 space-x-3"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={<Home />}
                            className="h-9 border-none px-5 text-gray-600"
                            onClick={() => handleNavigate("/")}
                        >
                            <Typography className="hidden whitespace-nowrap font-semibold md:inline">Home</Typography>
                        </Button>
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={<Category />}
                            className="h-9 border-none px-5 text-gray-600"
                            onClick={() => handleNavigate("/category")}
                        >
                            <Typography className="hidden whitespace-nowrap font-semibold md:inline">
                                Categories
                            </Typography>
                        </Button>
                        {/* <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={<Person />}
                            className="h-9 border-none px-5 text-gray-600"
                        >
                            <Typography className="font-semibold hidden whitespace-nowrap md:inline">My Account</Typography>
                        </Button> */}
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={<LoginOutlined />}
                            className="h-9 border-none px-5 text-gray-600"
                            onClick={() => (window.location.href = "/login")}
                        >
                            <Typography className="hidden whitespace-nowrap font-semibold md:inline">
                                Sign in
                            </Typography>
                        </Button>
                        <Button
                            sx={{
                                "& .MuiButton-startIcon": { mr: { xs: 0, md: 1 } },
                            }}
                            startIcon={
                                <Badge
                                    badgeContent={Object.keys(localCartProducts).length}
                                    color="primary"
                                    overlap="circular"
                                    variant="standard"
                                    className={classNames({ "me-3": Object.keys(localCartProducts).length > 0 })}
                                    sx={{
                                        "& .MuiBadge-badge": { fontSize: 10, minWidth: 15, height: 15, right: -5 },
                                    }}
                                >
                                    <ShoppingCart fontSize="small" />
                                </Badge>
                            }
                            onClick={() => (window.location.href = "/cart")}
                            className="h-9 border-none px-5 text-gray-600"
                        >
                            <Typography className="hidden whitespace-nowrap font-semibold md:inline">Cart</Typography>
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </AppBar>
    );
};

export default LandingHeader;
