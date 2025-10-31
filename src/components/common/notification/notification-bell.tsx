import React, { useState, useCallback } from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { useQueryGetUnreadCount, useQueryConnectStream } from "~/services/notifications/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { Notification } from "~/services/notifications/infras";
import { NotificationList } from "./notification-list";

export const NotificationBell: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const queryClient = useQueryClient();
    const { data: unreadCount = 0 } = useQueryGetUnreadCount();
    const handleNewNotification = useCallback(
        (_notification: Notification) => {
            queryClient.setQueryData([QueryKey.NOTIFICATIONS.GET_UNREAD_COUNT], (oldCount: number = 0) => {
                return oldCount + 1;
            });

            queryClient.invalidateQueries({
                queryKey: [QueryKey.NOTIFICATIONS.GET_NOTIFICATIONS],
            });
        },
        [queryClient],
    );

    // Connect to real-time stream
    useQueryConnectStream({
        enabled: true,
        onNotification: handleNewNotification,
    });

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const getTooltipTitle = () => {
        return `Thông báo (${unreadCount})`;
    };

    return (
        <>
            <Tooltip title={getTooltipTitle()} arrow placement="bottom">
                <IconButton
                    className="h-9 border-none text-gray-600"
                    onClick={handleClick}
                    color={unreadCount > 0 ? "primary" : "default"}
                >
                    <Badge
                        badgeContent={unreadCount}
                        color="error"
                        overlap="circular"
                        variant="standard"
                        sx={{
                            "& .MuiBadge-badge": {
                                fontSize: 10,
                                minWidth: 15,
                                height: 15,
                                right: -5,
                                top: 5,
                            },
                        }}
                    >
                        <NotificationsIcon fontSize="small" />
                    </Badge>
                </IconButton>
            </Tooltip>

            <NotificationList anchorEl={anchorEl} open={open} onClose={handleClose} />
        </>
    );
};
