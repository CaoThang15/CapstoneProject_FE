const productEndpointPrefix = "/products";

export const productsEndpoints = {
    getAllProducts: `${productEndpointPrefix}`,
    getProductById: (productId: number) => `${productEndpointPrefix}/get/${productId}`,
    getProductBySlug: (slug: string) => `${productEndpointPrefix}/${slug}`,
    createProduct: `${productEndpointPrefix}`,
    updateProduct: (id: number) => `${productEndpointPrefix}/${id}`,
    generateProductDescription: `/ai/suggest-description`,
    deleteProduct: (productId: number) => `${productEndpointPrefix}/${productId}`,
    getProductAttributeFilters: `${productEndpointPrefix}/attribute/filters`,
};
