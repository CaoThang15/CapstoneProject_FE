const uploadFilePrefix = "/upload";

export const uploadFileEndpoints = {
    uploadFile: `${uploadFilePrefix}/upload`,
    uploadImage: `${uploadFilePrefix}/image`,
    deleteImage: `${uploadFilePrefix}/image`,
    getFileById: (id: string) => `${uploadFilePrefix}/${id}`,
    deleteFileById: (id: string) => `${uploadFilePrefix}/${id}`,
    createDownloadUrl: (id: string) => `${uploadFilePrefix}/${id}/download`,
};
