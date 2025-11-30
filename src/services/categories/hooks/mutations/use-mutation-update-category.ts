import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { categoriesApi } from "../../infras";
import { IEditCategoryRequest } from "../../infras/types";

export function useMutationUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.CATEGORIES.UPDATE_CATEGORY],
        mutationFn: async (payload: IEditCategoryRequest) => {
            const response = await categoriesApi.updateCategory(payload);
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.CATEGORIES.GET_ALL_CATEGORIES] });
            queryClient.invalidateQueries({ queryKey: [QueryKey.CATEGORIES.GET_CATEGORY_BY_ID] });
            return response;
        },
    });
}
