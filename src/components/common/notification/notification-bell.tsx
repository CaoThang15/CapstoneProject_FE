import { Notifications as NotificationsIcon } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import { QueryKey } from "~/constants/query-key";
import { ApiNotification } from "~/entities/notification.entity";
import { useQueryGetUnreadCount } from "~/services/notifications/hooks";
import { useNotificationStream } from "~/services/notifications/hooks/queries/use-notification-stream";
import { NotificationList } from "./notification-list";

export const NotificationBell: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const queryClient = useQueryClient();
    const { data: unreadCount = 0 } = useQueryGetUnreadCount();
    const handleNewNotification = useCallback(
        (_notification: ApiNotification) => {
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
    useNotificationStream(handleNewNotification);

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
                        badgeContent={unreadCount > 9 ? "9+" : unreadCount}
                        color="error"
                        overlap="circular"
                        variant="standard"
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
                        <NotificationsIcon fontSize="small" />
                    </Badge>
                </IconButton>
            </Tooltip>

            <NotificationList anchorEl={anchorEl} open={open} onClose={handleClose} />
        </>
    );
};
