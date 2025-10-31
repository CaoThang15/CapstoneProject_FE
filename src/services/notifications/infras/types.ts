// API response structure for a single notification
export interface ApiNotification {
    id: number;
    systemNotificationId: number;
    type: number;
    content: string;
    isRead: boolean;
    idRefer: number | null;
    sendAt: string;
}

// Frontend notification interface (transformed from API)
export interface Notification {
    id: string;
    message: string;
    type: "general" | "voucher" | "order" | "payment";
    isRead: boolean;
    createdAt: string;
    updatedAt?: string;
    actionUrl?: string;
    metadata?: Record<string, any>;
}

// For backward compatibility and mock data
export interface NotificationListResponse {
    notifications: Notification[];
    totalCount: number;
    hasMore: boolean;
    nextCursor?: string;
}

export interface NotificationFilters {
    isRead?: boolean;
    type?: Notification["type"];
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
    // Map type number to string based on backend NotificationType enum
    const getTypeFromNumber = (type: number): Notification["type"] => {
        switch (type) {
            case 1:
                return "general"; // General = 1
            case 2:
                return "voucher"; // Voucher = 2
            case 3:
                return "order"; // Order = 3
            case 4:
                return "payment"; // Payment = 4
            default:
                return "general";
        }
    };

    return {
        id: apiNotification.id.toString(),
        message: apiNotification.content,
        type: getTypeFromNumber(apiNotification.type),
        isRead: apiNotification.isRead,
        createdAt: apiNotification.sendAt,
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
