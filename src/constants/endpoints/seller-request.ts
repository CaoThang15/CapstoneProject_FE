const sellerRequestEndpointPrefix = "/seller-requests";

export const sellerRequestEndpoints = {
    createSellerRequest: `${sellerRequestEndpointPrefix}`,
    getSellerRequestDetails: (requestId: number) => `${sellerRequestEndpointPrefix}/${requestId}`,
    getAllSellerRequests: `${sellerRequestEndpointPrefix}`,
    getCurrentSellerRequest: `${sellerRequestEndpointPrefix}/current`,
    responseSellerRequest: (requestId: number) => `${sellerRequestEndpointPrefix}/${requestId}/response`,
};
