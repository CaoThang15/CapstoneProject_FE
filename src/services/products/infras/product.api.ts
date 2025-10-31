import { endpoints } from "~/constants/endpoints";
import { Product } from "~/entities/product.entity";
import { callApi } from "~/libs/axios/request";
import { HttpMethod, IPagination } from "~/libs/axios/types";

const getListProducts = (params: Record<string, any>) => {
    return callApi<IPagination<Product>>({
        url: endpoints.products.getAllProducts,
        method: HttpMethod.GET,
        params,
    });
};

const getProductBySlug = (slug: string) => {
    return callApi<Product>({
        url: endpoints.products.getProductBySlug(slug),
        method: HttpMethod.GET,
    });
};

export const productsApi = {
    getListProducts,
    getProductBySlug,
};
