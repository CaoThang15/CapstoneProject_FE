import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { GenerateProductDescriptionRequest, productsApi } from "../../infras";

export function useMutationGenerateProductDescription() {
    return useMutation({
        mutationKey: [QueryKey.PRODUCTS.GENERATE_DESCRIPTION],
        mutationFn: async (data: GenerateProductDescriptionRequest) => {
            const response = await productsApi.generateProductDescription(data);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
