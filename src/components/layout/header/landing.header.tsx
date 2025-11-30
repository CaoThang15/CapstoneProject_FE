import { Recycling, SearchOutlined, ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import classNames from "classnames";
import React from "react";
import { useLocation } from "react-router";
import { NotificationBell } from "~/components/common/notification";
import { useAuth } from "~/contexts/auth.context";
import { LocalStorageCartItems } from "~/pages/cart/types";
import CategoryMenu from "./category-menu";
import SellerMenu from "./seller-menu";
import UserSection from "./user-section";

const LandingHeader: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();
    const isHomepage = location.pathname === "/";

    const [localCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);
    const [scrolled, setScrolled] = React.useState(false);

    const handleScroll = () => {
        const threshold = 100;
        setScrolled(window.scrollY > threshold);
    };

    React.useEffect(() => {
        if (!isHomepage) return;

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Box
            className={classNames(
                "z-50 flex w-full justify-between space-x-4 px-10 py-3 transition-all duration-500 ease-in-out",
                {
                    "fixed left-0 top-0 bg-white shadow-md": !isHomepage || scrolled,
                    "bg-transparent": isHomepage && !scrolled,
                },
            )}
        >
            <Box className="flex items-center space-x-3">
                <CategoryMenu />

                <Stack
                    direction={"row"}
                    spacing={0.5}
                    alignItems="center"
                    className="cursor-pointer rounded-2xl bg-white pe-5 ps-2"
                    sx={{
                        color: "primary.main",
                    }}
                    onClick={() => (window.location.href = "/")}
                >
                    <IconButton disableRipple edge="start" sx={{ color: "primary.main" }} aria-label="menu">
                        <Recycling />
                    </IconButton>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ color: "primary.main" }}
                        className="whitespace-nowrap"
                    >
                        S-Market
                    </Typography>
                </Stack>

                {isHomepage && !scrolled && <SellerMenu />}
            </Box>
            {(!isHomepage || scrolled) && (
                <TextField
                    className="flex-1"
                    size="small"
                    placeholder="Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn..."
                    slotProps={{
                        input: {
                            className: "rounded-full pe-1 ps-3 bg-gray-100 ",
                            startAdornment: <SearchOutlined className="pe-2 text-gray-400" />,
                            endAdornment: (
                                <IconButton
                                    sx={{
                                        bgcolor: "primary.main",
                                        ":hover": { bgcolor: "primary.light" },
                                    }}
                                    size="small"
                                >
                                    <SearchOutlined fontSize="small" className="text-white" />
                                </IconButton>
                            ),
                        },
                    }}
                />
            )}

            <Stack direction="row" spacing={1} className="ml-4" justifyContent="flex-end" alignItems="center">
                <Tooltip title="Giỏ hàng" arrow placement="bottom">
                    <IconButton onClick={() => (window.location.href = "/cart")} className="relative h-9 bg-white">
                        <Badge
                            badgeContent={
                                localCartProducts
                                    ? Object.keys(localCartProducts).length > 9
                                        ? "9+"
                                        : Object.keys(localCartProducts).length
                                    : 0
                            }
                            color="error"
                            overlap="circular"
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            sx={{
                                "& .MuiBadge-badge": {
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    transform: "translate(50%, -50%)",
                                    fontSize: 10,
                                    width: 15,
                                    height: 15,
                                    minWidth: 0,
                                    padding: 0,
                                },
                            }}
                        >
                            <ShoppingCart fontSize="small" />
                        </Badge>
                    </IconButton>
                </Tooltip>

                {/* Notification Bell */}
                {/* {user && <NotificationBell />} */}
                <Box className="rounded-2xl bg-white">{<NotificationBell />}</Box>
                {!user ? (
                    <Button
                        variant={scrolled ? "outlined" : "contained"}
                        className="rounded-full border-gray-300 bg-white px-5"
                        color="inherit"
                        onClick={() => (window.location.href = "/login")}
                    >
                        Đăng nhập
                    </Button>
                ) : (
                    <Button
                        variant={scrolled ? "outlined" : "contained"}
                        className="rounded-full border-gray-300 bg-white px-5"
                        color="inherit"
                        onClick={() => (window.location.href = "/user/profile")}
                    >
                        Trang cá nhân
                    </Button>
                )}
                <Button
                    variant="contained"
                    className="rounded-full px-5"
                    onClick={() => (window.location.href = "/seller/products/create")}
                >
                    Đăng tin
                </Button>
                <UserSection scrolled={scrolled} />
            </Stack>
        </Box>
    );
};

export default LandingHeader;
