import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { User } from "~/entities";
import { IBaseApiResponse, IPagination } from "~/libs/axios/types";
import { GetUsersWithPaginationRequest, userApis } from "../../infras";

const transformData = (response: IBaseApiResponse<IPagination<User>>): User[] => {
    return response.data.items.map((user) => User.fromJson(user));
};

export function useQueryGetUsersWithPagination(params: GetUsersWithPaginationRequest) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<IPagination<User>>>({
        queryKey: [QueryKey.USER.GET_LIST_USERS_WITH_PAGINATION, params],
        queryFn: async () => {
            return await userApis.getUsersWithPagination(params);
        },
    });

    const listUsers = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return transformData(data);
    }, [data, isError, isLoading]);

    const totalItems = React.useMemo(() => {
        if (isError || isLoading || !data) return 0;
        return data.data.metadata.totalItems;
    }, [data, isError, isLoading]);

    return {
        data: {
            items: listUsers,
            total: totalItems,
        },
        isLoading,
        isError,
        refetch,
    };
}
