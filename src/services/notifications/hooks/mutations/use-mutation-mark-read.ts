import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { notificationsApi } from "../../infras";

export function useMutationMarkRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.NOTIFICATIONS.MARK_AS_READ],
        mutationFn: async (notificationId: string) => {
            await notificationsApi.markAsRead(notificationId);
            return notificationId;
        },
        onSuccess: () => {
            // Invalidate and refetch notifications list
            queryClient.invalidateQueries({
                queryKey: [QueryKey.NOTIFICATIONS.GET_NOTIFICATIONS],
            });

            // Optimistically decrease unread count by 1
            queryClient.setQueryData([QueryKey.NOTIFICATIONS.GET_UNREAD_COUNT], (oldCount: number = 0) => {
                return Math.max(0, oldCount - 1);
            });
        },
        onError: (error) => {
            console.error("Failed to mark notification as read:", error);
        },
    });
}
