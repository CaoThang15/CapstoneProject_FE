const feedbackEndpointPrefix = "/feedbacks";

export const feedbackEndpoints = {
    publishFeedback: `${feedbackEndpointPrefix}`,
    getProductFeedbacks: `${feedbackEndpointPrefix}/product`,
    getMyFeedback: `${feedbackEndpointPrefix}`,
    getFeedbackById: (feedbackId: number) => `${feedbackEndpointPrefix}/${feedbackId}`,
    getProductFeedbackStatistic: (productId: number) => `${feedbackEndpointPrefix}/product/${productId}/statistic`,
};
