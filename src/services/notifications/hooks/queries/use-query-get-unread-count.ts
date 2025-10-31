import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { notificationsApi } from "../../infras";

interface UseQueryGetUnreadCountOptions {
    enabled?: boolean;
}

export function useQueryGetUnreadCount(
    options: UseQueryGetUnreadCountOptions = {},
    queryOptions?: Partial<UseQueryOptions<number, Error>>,
) {
    const { enabled = true } = options; // Removed automatic refetch interval

    return useQuery({
        queryKey: [QueryKey.NOTIFICATIONS.GET_UNREAD_COUNT],
        enabled,
        queryFn: async () => {
            const response = await notificationsApi.getUnreadCount();
            // The API returns { data: { unreadCount: number } }
            const count = response.data?.unreadCount || 0;
            console.log("🔔 Unread count:", count);
            return count;
        },

        staleTime: 0,
        gcTime: 0,
        refetchInterval: false,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        ...queryOptions,
    });
}
