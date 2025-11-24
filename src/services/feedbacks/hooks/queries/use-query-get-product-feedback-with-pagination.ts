import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { Feedback } from "~/entities/feedback.entity";
import { IBaseApiResponse, IPagination, IPaginationRequest } from "~/libs/axios/types";
import { feedbacksApi, GetFeedbacksRequest } from "../../infras";

const transformData = (response: IBaseApiResponse<IPagination<Feedback>>): Feedback[] => {
    return response.data.items;
};

export function useQueryGetProductFeedbacksWithPagination(params: GetFeedbacksRequest & IPaginationRequest) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<IPagination<Feedback>>>({
        queryKey: [QueryKey.FEEDBACK.GET_PRODUCT_FEEDBACKS, params],
        queryFn: async () => {
            return await feedbacksApi.getProductFeedback(params);
        },
    });

    const listFeedbacks = React.useMemo(() => {
        if (isError || isLoading || !data) return [];
        return transformData(data);
    }, [data, isError, isLoading]);

    const totalItems = React.useMemo(() => {
        if (isError || isLoading || !data) return 0;
        return data.data.metadata.totalItems;
    }, [data, isError, isLoading]);

    return {
        data: {
            items: listFeedbacks,
            total: totalItems,
        },
        isLoading,
        isError,
        refetch,
    };
}
