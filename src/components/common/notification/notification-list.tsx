import {
    Box,
    CircularProgress,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Popover,
    Stack,
    Typography,
    Chip,
    Button,
} from "@mui/material";
import {
    Notifications as NotificationsIcon,
    Delete as DeleteIcon,
    Circle as CircleIcon,
    CheckCircle as CheckCircleIcon,
    Info as InfoIcon,
    LocalOffer as VoucherIcon,
    ShoppingCart as OrderIcon,
    Payment as PaymentIcon,
} from "@mui/icons-material";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
    useInfiniteQueryNotifications,
    useMutationMarkRead,
    useMutationMarkAllRead,
    useMutationDeleteNotification,
} from "~/services/notifications/hooks";
import { Notification } from "~/services/notifications/infras";
import dayjs from "dayjs";

const NotificationTypeIcon: React.FC<{ type: Notification["type"]; isRead: boolean }> = ({ type, isRead }) => {
    const iconColor = isRead ? "action" : "primary";

    switch (type) {
        case "general":
            return <InfoIcon fontSize="small" color={iconColor} />;
        case "voucher":
            return <VoucherIcon fontSize="small" color={iconColor} />;
        case "order":
            return <OrderIcon fontSize="small" color={iconColor} />;
        case "payment":
            return <PaymentIcon fontSize="small" color={iconColor} />;
        default:
            return <InfoIcon fontSize="small" color={iconColor} />;
    }
};

const NotificationItem: React.FC<{
    notification: Notification;
    onMarkAsRead: (id: string) => void;
    onDelete: (id: string) => void;
}> = ({ notification, onMarkAsRead, onDelete }) => {
    const handleClick = () => {
        if (!notification.isRead) {
            onMarkAsRead(notification.id);
        }

        // Navigate to action URL if available
        if (notification.actionUrl) {
            window.location.href = notification.actionUrl;
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(notification.id);
    };

    return (
        <ListItem
            disablePadding
            sx={{
                backgroundColor: notification.isRead ? "transparent" : "rgba(25, 118, 210, 0.04)",
                borderLeft: notification.isRead ? "none" : "3px solid",
                borderLeftColor: "primary.main",
            }}
        >
            <ListItemButton onClick={handleClick} sx={{ py: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
                    <NotificationTypeIcon type={notification.type} isRead={notification.isRead} />

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: notification.isRead ? "normal" : "bold",
                                    color: notification.isRead ? "text.secondary" : "text.primary",
                                    flex: 1,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {notification.message}
                            </Typography>

                            {/* <Chip
                                label={notification.type.toUpperCase()}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ height: 18, fontSize: "0.65rem" }}
                            /> */}

                            {!notification.isRead && (
                                <CircleIcon sx={{ fontSize: 8, color: "primary.main", ml: "auto" }} />
                            )}
                        </Box>

                        <Typography variant="caption" color="text.secondary">
                            {dayjs(notification.createdAt).fromNow()}
                        </Typography>
                    </Box>

                    <IconButton size="small" onClick={handleDelete}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </ListItemButton>
        </ListItem>
    );
};

export const NotificationList: React.FC<{
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
}> = ({ anchorEl, open, onClose }) => {
    const { data, fetchNextPage, hasNextPage, isLoading, error } = useInfiniteQueryNotifications({
        limit: 10,
    });

    const markAsReadMutation = useMutationMarkRead();
    const markAllAsReadMutation = useMutationMarkAllRead();
    const deleteNotificationMutation = useMutationDeleteNotification();

    const allNotifications = data?.notifications ?? [];
    const hasUnreadNotifications = allNotifications.some((n: Notification) => !n.isRead);

    const handleMarkAsRead = (id: string) => {
        markAsReadMutation.mutate(id, {
            onError: () => {
                console.error("Failed to mark notification as read");
            },
        });
    };

    const handleMarkAllAsRead = () => {
        markAllAsReadMutation.mutate(undefined, {
            onSuccess: () => {
                console.log("All notifications marked as read");
            },
            onError: () => {
                console.error("Failed to mark all notifications as read");
            },
        });
    };

    const handleDelete = (id: string) => {
        deleteNotificationMutation.mutate(id, {
            onError: () => {
                console.error("Failed to delete notification");
            },
        });
    };

    if (error) {
        return (
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Paper sx={{ width: 400, maxHeight: 500, p: 2 }}>
                    <Typography color="error">Failed to load notifications</Typography>
                </Paper>
            </Popover>
        );
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                sx: { width: 400, maxHeight: 500 },
            }}
        >
            <Paper>
                {/* Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" component="h2">
                            Notifications
                        </Typography>
                        {hasUnreadNotifications && (
                            <Button
                                size="small"
                                onClick={handleMarkAllAsRead}
                                disabled={markAllAsReadMutation.isPending}
                                startIcon={<CheckCircleIcon />}
                            >
                                Mark all read
                            </Button>
                        )}
                    </Stack>
                </Box>

                {/* Content */}
                <Box sx={{ maxHeight: 400, overflow: "auto" }} id="notification-scroll-container">
                    {isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : allNotifications.length === 0 ? (
                        <Box sx={{ textAlign: "center", p: 3 }}>
                            <NotificationsIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
                            <Typography color="text.secondary">No notifications</Typography>
                        </Box>
                    ) : (
                        <InfiniteScroll
                            dataLength={allNotifications.length}
                            next={fetchNextPage}
                            hasMore={!!hasNextPage}
                            loader={
                                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                                    <CircularProgress size={20} />
                                </Box>
                            }
                            endMessage={
                                <Box sx={{ textAlign: "center", py: 2 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        No more notifications
                                    </Typography>
                                </Box>
                            }
                            scrollableTarget="notification-scroll-container"
                        >
                            <List disablePadding>
                                {allNotifications.map((notification: Notification, index: number) => (
                                    <React.Fragment key={notification.id}>
                                        <NotificationItem
                                            notification={notification}
                                            onMarkAsRead={handleMarkAsRead}
                                            onDelete={handleDelete}
                                        />
                                        {index < allNotifications.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </InfiniteScroll>
                    )}
                </Box>
            </Paper>
        </Popover>
    );
};
