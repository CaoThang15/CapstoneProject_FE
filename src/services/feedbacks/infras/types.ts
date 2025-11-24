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
}
