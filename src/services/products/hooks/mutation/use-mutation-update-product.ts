import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { UpdateProductRequest, productsApi } from "../../infras";

export function useMutationUpdateProduct() {
    return useMutation({
        mutationKey: [QueryKey.PRODUCTS.UPDATE],
        mutationFn: async ({ data }: { data: UpdateProductRequest }) => {
            const response = await productsApi.updateProduct(data.id, data);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
