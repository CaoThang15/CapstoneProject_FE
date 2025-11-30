import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { categoriesApi } from "../../infras";

export function useMutationDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QueryKey.CATEGORIES.DELETE_CATEGORY],
        mutationFn: async (categoryId: number) => {
            const response = await categoriesApi.deleteCategory(categoryId);
            return response.data;
        },
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.CATEGORIES.GET_ALL_CATEGORIES] });
            return response;
        },
    });
}
