import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { feedbacksApi } from "../../infras/feedback.api";
import { PublishFeedbackRequest } from "../../infras/types";

export function useMutationPublishFeedback() {
    return useMutation({
        mutationKey: [QueryKey.FEEDBACK.PUBLISH_FEEDBACK],
        mutationFn: async (payload: PublishFeedbackRequest) => {
            const response = await feedbacksApi.publishFeedback(payload);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
