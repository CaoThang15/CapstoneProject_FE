import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { categoriesApi } from "../../infras";
import { ICreateCategoryRequest } from "../../infras/types";

export function useMutationCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.CATEGORIES.CREATE_CATEGORY],
        mutationFn: async (payload: ICreateCategoryRequest) => {
            const response = await categoriesApi.createCategory(payload);
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.CATEGORIES.GET_ALL_CATEGORIES] });
            return response;
        },
    });
}
