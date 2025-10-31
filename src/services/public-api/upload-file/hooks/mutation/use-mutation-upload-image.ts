import { useMutation } from "@tanstack/react-query";
import { QueryKey } from "~/constants/query-key";
import { uploadFileApi, UploadFileRequest } from "../../infras";

export function useMutationUploadImage() {
    return useMutation({
        mutationKey: [QueryKey.UPLOAD_FILE.UPLOAD_FILE],
        mutationFn: async (request: UploadFileRequest) => {
            const response = await uploadFileApi.uploadImage(request);
            return response.data;
        },
        onSuccess: (response) => {
            return response;
        },
    });
}
