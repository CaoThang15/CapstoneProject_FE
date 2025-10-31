import { endpoints } from "~/constants/endpoints";
import { Category } from "~/entities";
import { callApi } from "~/libs/axios/request";
import { HttpMethod } from "~/libs/axios/types";

const getAllCategories = () => {
    return callApi<Category[]>({
        url: endpoints.categories.getAllCategories,
        method: HttpMethod.GET,
    });
};

const getCategoryById = (categoryId: string) => {
    return callApi<Category>({
        url: endpoints.categories.getCategoryById(categoryId),
        method: HttpMethod.GET,
    });
};

const getCategoryBySlug = (slug: string) => {
    return callApi<Category>({
        url: endpoints.categories.getCategoryBySlug(slug),
        method: HttpMethod.GET,
    });
};
export const categoriesApi = {
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
};
