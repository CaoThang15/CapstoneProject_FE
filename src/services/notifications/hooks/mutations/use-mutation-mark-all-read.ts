import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { notificationsApi } from "../../infras";

export function useMutationMarkAllRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.NOTIFICATIONS.MARK_ALL_AS_READ],
        mutationFn: async () => {
            await notificationsApi.markAllAsRead();
            return true;
        },
        onSuccess: () => {
            // Invalidate and refetch notifications list
            queryClient.invalidateQueries({
                queryKey: [QueryKey.NOTIFICATIONS.GET_NOTIFICATIONS],
            });

            // Set unread count to 0 when marking all as read
            queryClient.setQueryData([QueryKey.NOTIFICATIONS.GET_UNREAD_COUNT], 0);
        },
        onError: (error) => {
            console.error("Failed to mark all notifications as read:", error);
        },
    });
}
