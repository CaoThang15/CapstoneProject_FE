const productEndpointPrefix = "/products";

export const productsEndpoints = {
    getAllProducts: `${productEndpointPrefix}`,
    getProductById: (productId: string) => `${productEndpointPrefix}/get/${productId}`,
    getProductBySlug: (slug: string) => `${productEndpointPrefix}/${slug}`,
};
