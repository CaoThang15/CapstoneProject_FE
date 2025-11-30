import { endpoints } from "~/constants/endpoints";
import { Product } from "~/entities/product.entity";
import { callApi } from "~/libs/axios/request";
import { HttpMethod, IPagination } from "~/libs/axios/types";
import {
    CreateProductRequest,
    GenerateProductDescriptionRequest,
    PredictPriceRequest,
    PredictPriceResponse,
    ProductAttributeFilterRequest,
    ProductAttributeFiltersResponse,
    UpdateProductRequest,
} from "./types";

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
const updateProduct = (id: number, data: UpdateProductRequest) => {
    return callApi<Product>({
        url: endpoints.products.updateProduct(id),
        method: HttpMethod.PATCH,
        data,
    });
};

const generateProductDescription = (payload: GenerateProductDescriptionRequest) => {
    return callApi<string>({
        url: endpoints.products.generateProductDescription,
        method: HttpMethod.POST,
        data: payload,
    });
};

const deleteProduct = (productId: number) => {
    return callApi<void>({
        url: endpoints.products.deleteProduct(productId),
        method: HttpMethod.DELETE,
    });
};

const getProductAttributeFilters = (params: ProductAttributeFilterRequest) => {
    return callApi<ProductAttributeFiltersResponse>({
        url: endpoints.products.getProductAttributeFilters,
        method: HttpMethod.GET,
        params,
    });
};

const predictPrice = (data: PredictPriceRequest) => {
    return callApi<PredictPriceResponse>({
        url: endpoints.products.predictPrice,
        method: HttpMethod.POST,
        data,
    });
};

export const productsApi = {
    getListProducts,
    getProductBySlug,
    getProductById,
    createProduct,
    updateProduct,
    generateProductDescription,
    deleteProduct,
    getProductAttributeFilters,
    predictPrice,
};
