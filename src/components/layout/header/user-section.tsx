import { Box, Typography, Avatar, Divider, Menu, MenuItem, ListItemIcon } from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth.context";
import React from "react";

export default function UserSection() {
    const { user, logout } = useAuth();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleNavigateProfile = () => {
        handleCloseMenu();
        navigate("/profile");
    };

    const handleLogout = () => {
        handleCloseMenu();
        logout();
    };

    return (
        <Box className="flex items-center space-x-2 text-sm">
            {!user ? (
                <>
                    <Typography
                        variant="caption"
                        className="cursor-pointer text-center text-gray-500 hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Đăng ký
                    </Typography>
                    <Divider orientation="vertical" flexItem className="mx-2" />
                    <Typography
                        variant="caption"
                        className="cursor-pointer text-center text-gray-500 hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Đăng nhập
                    </Typography>
                </>
            ) : (
                <>
                    <Box
                        className="flex cursor-pointer items-center space-x-1 hover:text-gray-700"
                        onMouseEnter={handleOpenMenu}
                        onClick={handleNavigateProfile}
                    >
                        <Avatar src={user.avatar} className="h-5 w-5" />
                        <Typography variant="caption" className="text-gray-500">
                            Xin chào, {user.name}
                        </Typography>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        onMouseLeave={handleCloseMenu}
                        slotProps={{
                            paper: {
                                className: "mt-2",
                            },
                        }}
                    >
                        <MenuItem onClick={handleNavigateProfile}>
                            <ListItemIcon>
                                <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            Trang cá nhân
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Đăng xuất
                        </MenuItem>
                    </Menu>
                </>
            )}
        </Box>
    );
}
