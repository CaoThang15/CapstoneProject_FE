import { NotificationsOutlined } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, Stack, Tooltip } from "@mui/material";
import classNames from "classnames";
import React from "react";
import HeaderBreadcrumbs from "../breadcrumbs/manager.breadcrumb";

const ManagerHeader: React.FC = () => {
    return (
        <AppBar position="sticky" sx={{ top: 0 }} className="shadow-m w-full justify-center bg-white px-3 py-2">
            <Box className="flex items-center justify-between">
                <Stack direction={"row"} spacing={2} alignItems="center" className="pe-4">
                    <HeaderBreadcrumbs />
                </Stack>
                <Stack
                    flexDirection="row"
                    className="ml-4 basis-2/5 space-x-5"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <Tooltip title="Giỏ hàng" arrow placement="bottom">
                        <IconButton
                            onClick={() => (window.location.href = "/cart")}
                            className="h-9 border-none text-gray-600"
                        >
                            <Badge
                                badgeContent={0}
                                color="primary"
                                overlap="circular"
                                variant="standard"
                                className={classNames({
                                    "me-3": 1 > 0,
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
                                <NotificationsOutlined fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
        </AppBar>
    );
};

export default ManagerHeader;
