const UserQueryKey = {
    GET_LIST_USERS_WITH_PAGINATION: "getListUsersWithPagination",
    GET_USER_BY_ID: "getUserById",
    CREATE_USER: "createUser",
    UPDATE_USER: "updateUser",
    DELETE_USER: "deleteUser",
    GET_ROLE_NAMES: "getRoleNames",
    RESET_PASSWORD: "resetPassword",
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
};
const UsersQueryKey = {
    UPDATE_PROFILE: "updateProfile",
};

const OrdersQueryKey = {
    CREATE: "createOrder",
};
export const QueryKey = {
    UPLOAD_FILE: UploadFileQueryKey,
    USER: UserQueryKey,
    AUTH: AuthQueryKey,
    CATEGORIES: CategoriesQueryKey,
    ORDERS: OrdersQueryKey,
    PRODUCTS: ProductsQueryKey,
    USERS: UsersQueryKey,
};
