import { callApi } from "~/libs/axios/request";
import { HttpMethod, IPagination, IPaginationRequest } from "~/libs/axios/types";
import { endpoints } from "~/constants/endpoints";
import { GetFeedbacksRequest, PublishFeedbackRequest } from "./types";
import { Feedback } from "~/entities/feedback.entity";

const publishFeedback = async (payload: PublishFeedbackRequest) => {
    return await callApi<void>({
        method: HttpMethod.POST,
        url: endpoints.feedback.publishFeedback,
        data: payload,
    });
};

const getProductFeedback = async (payload: GetFeedbacksRequest & IPaginationRequest) => {
    return await callApi<IPagination<Feedback>>({
        method: HttpMethod.GET,
        url: endpoints.feedback.getProductFeedbacks,
        params: payload,
    });
};

export const feedbacksApi = {
    publishFeedback,
    getProductFeedback,
};
