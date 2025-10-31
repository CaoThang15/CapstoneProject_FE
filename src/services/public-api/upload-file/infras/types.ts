export interface UploadFileRequest {
    file: File;
    folder: string;
}

export interface UploadImageResponse {
    imageUrl: string;
}
export interface UploadedFile {
    id: string;
    fileName: string;
    imageUrl: string;
}
