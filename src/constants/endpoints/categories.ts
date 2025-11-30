const categoriesEndpointPrefix = "/categories";
export const categoriesEndpoints = {
    getAllCategories: `${categoriesEndpointPrefix}`,
    getCategoryById: (categoryId: string) => `${categoriesEndpointPrefix}/get/${categoryId}`,
    getCategoryBySlug: (slug: string) => `${categoriesEndpointPrefix}/${slug}`,
    createCategory: `${categoriesEndpointPrefix}`,
    updateCategory: (categoryId: number) => `${categoriesEndpointPrefix}/${categoryId}`,
    deleteCategory: (categoryId: number) => `${categoriesEndpointPrefix}/${categoryId}`,
};
