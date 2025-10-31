import { useQueries, UseQueryResult } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { Product } from "~/entities/product.entity";
import { IBaseApiResponse } from "~/libs/axios/types";
import { LocalStorageCartItems, ProductCartItem } from "~/pages/cart/types";
import { productsApi } from "~/services/products/infras";

export interface ProductCartResult {
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    data: ProductCartItem | null;
}

const transformData = (
    response: UseQueryResult<IBaseApiResponse<Product>, Error>,
    localStorageCart: LocalStorageCartItems,
): ProductCartResult => {
    if (response.isError || response.isLoading || !response.data) {
        return {
            isLoading: response.isLoading,
            isError: response.isError,
            error: response.error ?? null,
            data: null,
        };
    }

    const product = response.data.data;
    const quantity = localStorageCart[product.id]?.quantity || 0;

    return {
        isLoading: false,
        isError: false,
        error: null,
        data: {
            ...product,
            quantity,
        },
    };
};

export default function useQueryGetProductCart(localStorageCart: LocalStorageCartItems) {
    const response = useQueries({
        queries: Object.keys(localStorageCart).map((productId) => ({
            queryKey: [QueryKey.PRODUCTS.GET_PRODUCT_BY_ID, productId],
            queryFn: async () => productsApi.getProductById(Number(productId)),
            enabled: !!productId,
        })),
    });

    return response.map((item) => transformData(item, localStorageCart));
}
