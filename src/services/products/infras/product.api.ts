import { endpoints } from "~/constants/endpoints";
import { Product } from "~/entities/product.entity";
import { callApi } from "~/libs/axios/request";
import { HttpMethod, IPagination } from "~/libs/axios/types";
import { CreateProductRequest } from "./types";

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

const getProductById = (id: number) => {
    return callApi<Product>({
        url: endpoints.products.getProductById(id),
        method: HttpMethod.GET,
    });
};

const createProduct = (data: CreateProductRequest) => {
    return callApi<Product>({
        url: endpoints.products.createProduct,
        method: HttpMethod.POST,
        data,
    });
};

export const productsApi = {
    getListProducts,
    getProductBySlug,
    getProductById,
    createProduct,
};
