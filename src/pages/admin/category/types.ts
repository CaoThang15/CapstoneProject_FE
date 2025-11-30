import { UploadedFile } from "~/services/public-api/upload-file/infras";

export interface ICreateCategoryFormValues {
    name: string;
    thumbnail?: UploadedFile;
}

export interface IEditCategoryFormValues {
    name?: string;
    thumbnail?: UploadedFile;
}
