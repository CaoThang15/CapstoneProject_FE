import { useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import {
    notificationsApi,
    NotificationListResponse,
    NotificationQueryParams,
    transformNotificationListResponse,
} from "../../infras";

interface UseInfiniteQueryNotificationsParams extends Omit<NotificationQueryParams, "page"> {
    enabled?: boolean;
}

export function useInfiniteQueryNotifications(
    params: UseInfiniteQueryNotificationsParams = {},
    options?: Partial<UseInfiniteQueryOptions<NotificationListResponse, Error>>,
) {
    const { enabled = true, ...queryParams } = params;

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isError, error } =
        useInfiniteQuery({
            queryKey: [QueryKey.NOTIFICATIONS.GET_NOTIFICATIONS, "infinite", queryParams],
            enabled,
            queryFn: async ({ pageParam = 1 }) => {
                const response = await notificationsApi.getNotifications({
                    ...queryParams,
                    page: pageParam as number,
                });
                return transformNotificationListResponse(response.data, pageParam as number);
            },
            getNextPageParam: (lastPage: NotificationListResponse, allPages) => {
                if (lastPage.hasMore) {
                    return allPages.length + 1;
                }
                return undefined;
            },
            initialPageParam: 1,
            staleTime: 5 * 60 * 1000, // 5 minutes
            ...options,
        });

    const notifications = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return (data as any).pages.flatMap((page: NotificationListResponse) => page.notifications);
    }, [data, isError, isLoading]);

    const totalCount = React.useMemo(() => {
        if (isError || isLoading || !data || !(data as any).pages.length) return 0;
        return (data as any).pages[0].totalCount;
    }, [data, isError, isLoading]);

    return {
        data: {
            notifications,
            totalCount,
        },
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch,
    };
}
