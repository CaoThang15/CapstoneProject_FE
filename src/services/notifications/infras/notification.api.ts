import { endpoints } from "~/constants/endpoints";
import { callApi } from "~/libs/axios/request";
import { HttpMethod, IPagination } from "~/libs/axios/types";
import { ApiNotification, NotificationQueryParams } from "./types";

const getNotifications = (params: NotificationQueryParams = {}) => {
    const { page = 1, limit = 20, filters = {} } = params;

    const queryParams: Record<string, any> = {
        page: page.toString(),
        pageSize: limit.toString(),
    };

    if (filters.isRead !== undefined) {
        queryParams.isRead = filters.isRead.toString();
    }

    if (filters.type) {
        const typeMap: Record<string, string> = {
            general: "1",
            voucher: "2",
            order: "3",
            payment: "4",
        };
        queryParams.type = typeMap[filters.type] || "1";
    }

    if (filters.startDate) {
        queryParams.startDate = filters.startDate;
    }

    if (filters.endDate) {
        queryParams.endDate = filters.endDate;
    }

    return callApi<IPagination<ApiNotification>>({
        url: endpoints.notifications.GET_NOTIFICATIONS,
        method: HttpMethod.GET,
        params: queryParams,
    });
};

const markAsRead = (notificationId: string) => {
    return callApi<void>({
        url: endpoints.notifications.MARK_AS_READ.replace(":id", notificationId),
        method: HttpMethod.PATCH,
        data: {},
    });
};

const markAllAsRead = () => {
    return callApi<void>({
        url: endpoints.notifications.MARK_ALL_AS_READ,
        method: HttpMethod.PATCH,
        data: {},
    });
};

const deleteNotification = (notificationId: string) => {
    return callApi<void>({
        url: endpoints.notifications.DELETE_NOTIFICATION.replace(":id", notificationId),
        method: HttpMethod.DELETE,
    });
};

const getUnreadCount = () => {
    return callApi<{ unreadCount: number }>({
        url: endpoints.notifications.GET_UNREAD_COUNT,
        method: HttpMethod.GET,
    });
};

export const notificationsApi = {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount,
};
