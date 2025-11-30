import {
    KeyboardArrowDownOutlined,
    PersonOutlineOutlined,
    Recycling,
    SearchOutlined,
    ShoppingCart,
} from "@mui/icons-material";
import { Avatar, Badge, Box, Button, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useLocalStorage } from "@uidotdev/usehooks";
import classNames from "classnames";
import React from "react";
import { Outlet } from "react-router";
import { NotificationBell } from "~/components/common";
import { BreadcrumbProvider } from "~/components/layout/breadcrumbs/manager-breadcrumb.context";
import { useAuth } from "~/contexts/auth.context";
import { LocalStorageCartItems } from "../cart/types";
import CategoryHoverMenu from "../../components/layout/header/category-menu";
import SellerMenu from "../../components/layout/header/seller-menu";

const TemplateLayout: React.FC = () => {
    const { user } = useAuth();
    const [localCartProducts] = useLocalStorage("cart", {} as LocalStorageCartItems);
    const [scrolled, setScrolled] = React.useState(false);

    const handleScroll = () => {
        const threshold = 100;
        setScrolled(window.scrollY > threshold);
    };

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <BreadcrumbProvider>
            <Box className={`flex min-h-screen w-full flex-col`}>
                <Box
                    className={classNames(
                        "flex w-full justify-between space-x-4 px-10 py-3 transition-all duration-500 ease-in-out",
                        {
                            "fixed left-0 top-0 z-50 bg-white shadow-md": scrolled,
                            "bg-transparent": !scrolled,
                        },
                    )}
                >
                    <Box className="flex items-center space-x-1">
                        <CategoryHoverMenu />

                        <Stack
                            direction={"row"}
                            spacing={0.5}
                            alignItems="center"
                            className="cursor-pointer rounded-2xl bg-white px-3"
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
                                className="w-1/2 whitespace-nowrap"
                            >
                                S-Market
                            </Typography>
                        </Stack>

                        {!scrolled && <SellerMenu />}
                    </Box>
                    {scrolled && (
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
                                            }}
                                            size="small"
                                        >
                                            <SearchOutlined fontSize="small" />
                                        </IconButton>
                                    ),
                                },
                            }}
                        />
                    )}

                    <Stack direction="row" spacing={1} className="ml-4" justifyContent="flex-end" alignItems="center">
                        <Tooltip title="Giỏ hàng" arrow placement="bottom">
                            <IconButton onClick={() => (window.location.href = "/cart")} className="h-9 bg-white">
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
                        <Box className="rounded-2xl bg-white">{<NotificationBell />}</Box>
                        <Button variant="outlined" className="rounded-full border-gray-300 px-5" color="inherit">
                            Đăng nhập
                        </Button>
                        <Button variant="contained" className="rounded-full px-5">
                            Đăng tin
                        </Button>
                        <Button
                            endIcon={<KeyboardArrowDownOutlined />}
                            color="inherit"
                            className="rounded-full border-gray-300 py-0.5 pe-2 ps-0.5"
                        >
                            {user ? (
                                <Avatar src={user.avatar}></Avatar>
                            ) : (
                                <Avatar
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        bgcolor: "transparent",
                                        border: "1px solid",
                                        borderColor: "gray",
                                        color: "#555",
                                    }}
                                >
                                    <PersonOutlineOutlined fontSize="small" />
                                </Avatar>
                            )}
                        </Button>
                    </Stack>
                </Box>

                <Box className="flex min-h-[2000px] w-full flex-1">
                    <Box className="flex-1 overflow-auto p-4">
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </BreadcrumbProvider>
    );
};

export default TemplateLayout;
