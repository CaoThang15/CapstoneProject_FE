import { authEndpoints } from "./auth";
import { categoriesEndpoints } from "./categories";
import { feedbackEndpoints } from "./feedback";
import { notificationsEndpoints } from "./notifications";
import { ordersEndpoints } from "./orders";
import { productsEndpoints } from "./products";
import { publicApiEndpoints } from "./public-api";
import { sellerRequestEndpoints } from "./seller-request";
import { uploadFileEndpoints } from "./upload-file";
import { usersEndpoints } from "./users";
import { voucherEndpoints } from "./voucher";

export const endpoints = {
    uploadFile: uploadFileEndpoints,
    auth: authEndpoints,
    publicApi: publicApiEndpoints,
    categories: categoriesEndpoints,
    products: productsEndpoints,
    users: usersEndpoints,
    orders: ordersEndpoints,
    vouchers: voucherEndpoints,
    notifications: notificationsEndpoints,
    feedback: feedbackEndpoints,
    sellerRequest: sellerRequestEndpoints,
};
