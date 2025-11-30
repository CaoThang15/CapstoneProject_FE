import { SharedFile } from "~/entities";

export interface ICreateCategoryRequest {
    name: string;
    thumbnail?: SharedFile;
}

export interface IEditCategoryRequest {
    id: number;
    name?: string;
    thumbnail?: SharedFile;
}
