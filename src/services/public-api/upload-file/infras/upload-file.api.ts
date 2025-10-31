import { endpoints } from "~/constants/endpoints";
import { callApi } from "~/libs/axios/request";
import { HttpMethod } from "~/libs/axios/types";
import { UploadFileRequest, UploadImageResponse } from "./types";

const uploadImage = (request: UploadFileRequest) => {
    const formData = new FormData();
    formData.append("file", request.file);
    formData.append("folder", request.folder);

    return callApi<UploadImageResponse>({
        method: HttpMethod.POST,
        url: endpoints.uploadFile.uploadImage,
        data: formData,
    });
};

const createDownloadUrl = (fileId: string) => {
    return callApi<string>({
        method: HttpMethod.POST,
        url: endpoints.uploadFile.createDownloadUrl(fileId),
        data: null,
    });
};

const deleteFile = (imageUrl: string) => {
    return callApi<boolean>({
        method: HttpMethod.DELETE,
        url: endpoints.uploadFile.deleteImage,
        params: { imageUrl },
    });
};

export const uploadFileApi = {
    uploadImage,
    createDownloadUrl,
    deleteFile,
};
