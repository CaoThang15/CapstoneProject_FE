import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { CreateProductRequest, productsApi } from "../../infras";

export function useMutationCreateProduct() {
    return useMutation({
        mutationKey: [QueryKey.PRODUCTS.CREATE],
        mutationFn: async (data: CreateProductRequest) => {
            const response = await productsApi.createProduct(data);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
