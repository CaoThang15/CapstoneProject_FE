const UserQueryKey = {
    GET_LIST_USERS_WITH_PAGINATION: "getListUsersWithPagination",
    GET_USER_BY_ID: "getUserById",
    CREATE_USER: "createUser",
    UPDATE_USER: "updateUser",
    DELETE_USER: "deleteUser",
    GET_ROLE_NAMES: "getRoleNames",
    RESET_PASSWORD: "resetPassword",
    UPDATE_PROFILE: "updateProfile",
};

const AuthQueryKey = {
    CONFIRM_PASSWORD: "confirmPassword",
};

const UploadFileQueryKey = {
    UPLOAD_FILE: "uploadFile",
    CREATE_DOWNLOAD_URL: "createDownloadUrl",
    DELETE_FILE: "deleteFile",
};

const CategoriesQueryKey = {
    GET_ALL_CATEGORIES: "getAllCategories",
    GET_CATEGORY_BY_ID: "getCategoryById",
    CREATE_CATEGORY: "createCategory",
    UPDATE_CATEGORY: "updateCategory",
    DELETE_CATEGORY: "deleteCategory",
    GET_CATEGORY_BY_SLUG: "getCategoryBySlug",
};

const ProductsQueryKey = {
    GET_LIST_PRODUCTS: "getListProducts",
    GET_PRODUCT_BY_ID: "getProductById",
    GET_PRODUCT_BY_SLUG: "getProductBySlug",
    CREATE: "createProduct",
    UPDATE: "updateProduct",
    GENERATE_DESCRIPTION: "generateProductDescription",
    DELETE: "deleteProduct",
};

const OrdersQueryKey = {
    CREATE: "createOrder",
    GET_ORDERS: "getOrders",
    GET_MY_ORDERS: "getMyOrders",
    GET_ORDER_BY_ID: "getOrderById",
    UPDATE_ORDER_STATUS: "updateOrderStatus",
};

const VoucherQueryKey = {
    VALIDATE_VOUCHER: "validateVoucher",
    GET_VOUCHER_BY_CODE: "getVoucherByCode",
    GET_ALL_VOUCHERS: "getAllVouchers",
    GET_MY_VOUCHERS: "getMyVouchers",
    GET_ACTIVE_VOUCHERS: "getActiveVouchers",
    ASSIGN_VOUCHER: "assignVoucher",
    REMOVE_ASSIGN_VOUCHER: "removeAssignVoucher",
};

const NotificationQueryKey = {
    GET_NOTIFICATIONS: "getNotifications",
    MARK_AS_READ: "markAsRead",
    MARK_ALL_AS_READ: "markAllAsRead",
    DELETE_NOTIFICATION: "deleteNotification",
    GET_UNREAD_COUNT: "getUnreadCount",
    STREAM: "notificationStream",
};

const MessageQueryKey = {
    GENERATE_CHATBOX_MESSAGE: "generateChatboxMessage",
};

const FeedbackQueryKey = {
    PUBLISH_FEEDBACK: "publishFeedback",
    GET_PRODUCT_FEEDBACKS: "getProductFeedbacks",
    GET_PRODUCT_FEEDBACK_STATISTIC: "getProductFeedbackStatistic",
};

const SellerRequestQueryKey = {
    CREATE_SELLER_REQUEST: "createSellerRequest",
    GET_LIST_SELLER_REQUESTS: "getListSellerRequests",
    GET_SELLER_REQUEST_DETAILS: "getSellerRequestDetails",
    RESPONSE_SELLER_REQUEST: "responseSellerRequest",
    GET_CURRENT_SELLER_REQUEST: "getCurrentSellerRequest",
};

export const QueryKey = {
    UPLOAD_FILE: UploadFileQueryKey,
    USER: UserQueryKey,
    AUTH: AuthQueryKey,
    CATEGORIES: CategoriesQueryKey,
    ORDERS: OrdersQueryKey,
    PRODUCTS: ProductsQueryKey,
    VOUCHER: VoucherQueryKey,
    NOTIFICATIONS: NotificationQueryKey,
    MESSAGE: MessageQueryKey,
    FEEDBACK: FeedbackQueryKey,
    SELLER_REQUEST: SellerRequestQueryKey,
};
