import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { notificationsApi } from "../../infras";

export function useMutationDeleteNotification() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.NOTIFICATIONS.DELETE_NOTIFICATION],
        mutationFn: async (notificationId: string) => {
            await notificationsApi.deleteNotification(notificationId);
            return notificationId;
        },
        onSuccess: (deletedId) => {
            // Find if the deleted notification was unread
            let wasUnread = false;
            queryClient.setQueriesData({ queryKey: [QueryKey.NOTIFICATIONS.GET_NOTIFICATIONS] }, (oldData: any) => {
                if (!oldData?.pages) return oldData;

                // Check if deleted notification was unread
                for (const page of oldData.pages) {
                    const deletedNotification = page.notifications?.find((n: any) => n.id === deletedId);
                    if (deletedNotification && !deletedNotification.isRead) {
                        wasUnread = true;
                        break;
                    }
                }

                return {
                    ...oldData,
                    pages: oldData.pages.map((page: any) => ({
                        ...page,
                        notifications: page.notifications?.filter((notification: any) => notification.id !== deletedId),
                        totalCount: page.totalCount ? page.totalCount - 1 : 0,
                    })),
                };
            });

            // Update unread count if deleted notification was unread
            if (wasUnread) {
                queryClient.setQueryData([QueryKey.NOTIFICATIONS.GET_UNREAD_COUNT], (oldCount: number = 0) => {
                    return Math.max(0, oldCount - 1);
                });
            }
        },
        onError: (error) => {
            console.error("Failed to delete notification:", error);
        },
    });
}
