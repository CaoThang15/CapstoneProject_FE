const productEndpointPrefix = "/products";

export const productsEndpoints = {
    getAllProducts: `${productEndpointPrefix}`,
    getProductById: (productId: number) => `${productEndpointPrefix}/get/${productId}`,
    getProductBySlug: (slug: string) => `${productEndpointPrefix}/${slug}`,
};
