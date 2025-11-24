const feedbackEndpointPrefix = "/feedbacks";

export const feedbackEndpoints = {
    publishFeedback: `${feedbackEndpointPrefix}`,
    getProductFeedbacks: `${feedbackEndpointPrefix}/product`,
    getMyFeedback: `${feedbackEndpointPrefix}`,
    getFeedbackById: (feedbackId: number) => `${feedbackEndpointPrefix}/${feedbackId}`,
};
