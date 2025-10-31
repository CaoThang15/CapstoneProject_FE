const productEndpointPrefix = "/products";

export const productsEndpoints = {
    getAllProducts: `${productEndpointPrefix}`,
    getProductById: (productId: string) => `${productEndpointPrefix}/${productId}`,
};
