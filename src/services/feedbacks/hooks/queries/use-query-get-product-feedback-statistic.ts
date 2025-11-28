import { useQuery } from "@tanstack/react-query";
import React from "react";
import { QueryKey } from "~/constants/query-key";
import { IBaseApiResponse } from "~/libs/axios/types";
import { feedbacksApi, GetProductFeedbackStatisticResponse } from "../../infras";

const transformData = (
    response: IBaseApiResponse<GetProductFeedbackStatisticResponse>,
): GetProductFeedbackStatisticResponse => {
    return response.data;
};

export function useQueryGetProductFeedbackStatistic(productId: number) {
    const { data, isLoading, refetch, isError } = useQuery<IBaseApiResponse<GetProductFeedbackStatisticResponse>>({
        queryKey: [QueryKey.FEEDBACK.GET_PRODUCT_FEEDBACK_STATISTIC, productId],
        queryFn: async () => {
            return await feedbacksApi.getProductFeedbackStatistic(productId);
        },
        enabled: !!productId,
    });

    const statistic = React.useMemo(() => {
        if (isError || isLoading || !data)
            return {
                ratingStatistic: {},
                averageRating: 0,
            } as GetProductFeedbackStatisticResponse;
        return transformData(data);
    }, [data, isError, isLoading]);

    return {
        data: statistic,
        isLoading,
        isError,
        refetch,
    };
}
