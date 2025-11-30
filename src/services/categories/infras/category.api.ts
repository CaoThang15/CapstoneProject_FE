import { endpoints } from "~/constants/endpoints";
import { Category } from "~/entities";
import { callApi } from "~/libs/axios/request";
import { HttpMethod } from "~/libs/axios/types";
import { ICreateCategoryRequest, IEditCategoryRequest } from "./types";

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

const createCategory = (data: ICreateCategoryRequest) => {
    return callApi<Category>({
        url: endpoints.categories.createCategory,
        method: HttpMethod.POST,
        data,
    });
};

const updateCategory = (data: IEditCategoryRequest) => {
    return callApi<Category>({
        url: endpoints.categories.updateCategory(data.id),
        method: HttpMethod.PATCH,
        data,
    });
};

const deleteCategory = (categoryId: number) => {
    return callApi<void>({
        url: endpoints.categories.deleteCategory(categoryId),
        method: HttpMethod.DELETE,
    });
};

export const categoriesApi = {
    getAllCategories,
    getCategoryById,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
};
