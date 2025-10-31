import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { categoriesApi } from "../../infras";
import { Category } from "~/entities";
import { IBaseApiResponse } from "~/libs/axios/types";
import React from "react";

const transformData = (data: IBaseApiResponse<Category[]>): Category[] => {
    return data.data;
};
export function useQueryCategories() {
    const { data, isLoading, isError } = useQuery<IBaseApiResponse<Category[]>>({
        queryKey: [QueryKey.CATEGORIES.GET_ALL_CATEGORIES],
        queryFn: async () => {
            return await categoriesApi.getAllCategories();
        },
    });

    const listCategories = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: listCategories,
        isLoading,
        isError,
    };
}
