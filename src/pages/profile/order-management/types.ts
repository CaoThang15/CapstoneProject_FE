import { UploadedFile } from "~/services/public-api/upload-file/infras";

export interface FeedbackFormData {
    feedbacks: {
        productId: number;
        content: string;
        rate: number;
        userId?: number;
        sharedFile?: UploadedFile;
    }[];
}
