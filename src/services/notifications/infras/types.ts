import { ApiNotification, Notification, NotificationType } from "~/entities/notification.entity";

// API response structure for a single notification
// Frontend notification interface (transformed from API)
// For backward compatibility and mock data
export interface NotificationListResponse {
    notifications: Notification[];
    totalCount: number;
    hasMore: boolean;
    nextCursor?: string;
}

export interface NotificationFilters {
    isRead?: boolean;
    type?: NotificationType;
    startDate?: string;
    endDate?: string;
}

export interface NotificationQueryParams {
    page?: number;
    limit?: number;
    cursor?: string;
    filters?: NotificationFilters;
}

export const transformNotification = (apiNotification: ApiNotification): Notification => {
    return {
        id: apiNotification.id,
        message: apiNotification.content,
        type: apiNotification.type as NotificationType,
        isRead: apiNotification.isRead,
        createdAt: new Date(apiNotification.sendAt),
        createdBy: null,
        lastUpdatedBy: null,
        actionUrl: apiNotification.idRefer ? `/orders/${apiNotification.idRefer}` : undefined, //waiting for actual endpoint
        metadata: {
            systemNotificationId: apiNotification.systemNotificationId,
            idRefer: apiNotification.idRefer,
        },
    };
};

export const transformNotificationListResponse = (
    apiResponse: { items: ApiNotification[]; metadata: any },
    page: number,
): NotificationListResponse => {
    const transformedNotifications = apiResponse.items.map(transformNotification);
    return {
        notifications: transformedNotifications,
        totalCount: apiResponse.metadata.totalItems,
        hasMore: apiResponse.metadata.hasMoreRecords,
        nextCursor: apiResponse.metadata.hasMoreRecords ? (page + 1).toString() : undefined,
    };
};
