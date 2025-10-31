import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { categoriesApi } from "../../infras";
import { Category } from "~/entities";
import { IBaseApiResponse } from "~/libs/axios/types";
import React from "react";

const transformData = (response: IBaseApiResponse<Category>): Category => {
    return response.data;
};
export function useQueryCategoryById({ categoryId }: { categoryId: string }) {
    const { data, isLoading, isError } = useQuery<IBaseApiResponse<Category>>({
        queryKey: [QueryKey.CATEGORIES.GET_CATEGORY_BY_ID, categoryId],
        queryFn: async () => {
            return await categoriesApi.getCategoryById(categoryId);
        },
        enabled: !!categoryId,
    });

    const category = React.useMemo(() => {
        if (isError || isLoading || !data) return null;
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: category,
        isLoading,
        isError,
    };
}
