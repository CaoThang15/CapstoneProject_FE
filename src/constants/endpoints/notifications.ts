export const notificationsEndpoints = {
    GET_NOTIFICATIONS: "/notification",
    MARK_AS_READ: "/notification/mark-read/:id",
    MARK_ALL_AS_READ: "/notification/mark-all-read",
    DELETE_NOTIFICATION: "/notification/:id",
    GET_UNREAD_COUNT: "/notification/unread-count",
    STREAM: "/notification/stream",
} as const;
