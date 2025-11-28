import { SharedFile } from "~/entities";

export interface PublishFeedbackRequest {
    content: string;
    rate: number;
    productId: number;
    userId: number;
    sharedFile: SharedFile;
}

export interface GetFeedbacksRequest {
    productId?: number;
    userId?: number;
}

export interface GetProductFeedbackStatisticResponse {
    ratingStatistic: Record<number, number>;
    averageRating: number;
    totalFeedbacks: number;
}
