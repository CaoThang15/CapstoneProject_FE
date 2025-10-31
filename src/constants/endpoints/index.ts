import { authEndpoints } from "./auth";
import { categoriesEndpoints } from "./categories";
import { notificationsEndpoints } from "./notifications";
import { ordersEndpoints } from "./orders";
import { productsEndpoints } from "./products";
import { publicApiEndpoints } from "./public-api";
import { uploadFileEndpoints } from "./upload-file";
import { usersEndpoints } from "./users";

export const endpoints = {
    uploadFile: uploadFileEndpoints,
    auth: authEndpoints,
    publicApi: publicApiEndpoints,
    categories: categoriesEndpoints,
    products: productsEndpoints,
    users: usersEndpoints,
    orders: ordersEndpoints,
    notifications: notificationsEndpoints,
};
