const categoriesEndpointPrefix = "/categories";
export const categoriesEndpoints = {
    getAllCategories: `${categoriesEndpointPrefix}`,
    getCategoryById: (categoryId: string) => `${categoriesEndpointPrefix}/get/${categoryId}`,
    getCategoryBySlug: (slug: string) => `${categoriesEndpointPrefix}/${slug}`,
};
