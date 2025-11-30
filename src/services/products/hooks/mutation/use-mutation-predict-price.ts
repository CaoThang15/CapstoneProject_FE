import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { PredictPriceRequest, productsApi } from "../../infras";

export function useMutationPredictPrice() {
    return useMutation({
        mutationKey: [QueryKey.PRODUCTS.PREDICT_PRICE],
        mutationFn: async (data: PredictPriceRequest) => {
            const response = await productsApi.predictPrice(data);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
