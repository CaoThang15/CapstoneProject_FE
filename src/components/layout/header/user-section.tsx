import { AccountCircle, KeyboardArrowDownOutlined, Logout, PersonOutlineOutlined } from "@mui/icons-material";
import { Avatar, Button, ListItemIcon, Menu, MenuItem } from "@mui/material";
import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/auth.context";

interface Props {
    scrolled: boolean;
}
export default function UserSection({ scrolled }: Props) {
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
        navigate("/user/profile");
    };

    const handleLogout = () => {
        handleCloseMenu();
        logout();
    };

    return (
        <>
            <Button
                endIcon={<KeyboardArrowDownOutlined />}
                color="inherit"
                disableRipple
                variant={scrolled ? "outlined" : "contained"}
                className={classNames("rounded-full border-gray-300 py-0.5 pe-2 ps-0.5", {
                    "bg-white": !scrolled,
                    "bg-transparent": scrolled,
                })}
                onClick={handleOpenMenu}
            >
                {/* TODO: handle the paper when click the icon */}
                {user ? (
                    <>
                        <Avatar
                            src={user.avatar}
                            sx={{
                                width: 28,
                                height: 28,
                                bgcolor: scrolled ? "white" : "transparent",
                                border: "1px solid",
                                borderColor: "gray",
                                color: "#555",
                            }}
                        />
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
                ) : (
                    <>
                        <Avatar
                            sx={{
                                width: 28,
                                height: 28,
                                bgcolor: scrolled ? "white" : "transparent",
                                border: "1px solid",
                                borderColor: "gray",
                                color: "#555",
                            }}
                        >
                            <PersonOutlineOutlined fontSize="small" />
                        </Avatar>
                    </>
                )}
            </Button>
        </>
    );
}
