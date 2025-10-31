import { authEndpoints } from "./auth";
import { categoriesEndpoints } from "./categories";
import { productsEndpoints } from "./products";
import { publicApiEndpoints } from "./public-api";
import { uploadFileEndpoints } from "./upload-file";

export const endpoints = {
    uploadFile: uploadFileEndpoints,
    auth: authEndpoints,
    publicApi: publicApiEndpoints,
    categories: categoriesEndpoints,
    products: productsEndpoints,
};
