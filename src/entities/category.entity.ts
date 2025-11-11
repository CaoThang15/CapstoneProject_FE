import { BaseEntity } from "./base.entity";

export class CategorySharedFile {
    name: string;
    path: string;
}
export class Category extends BaseEntity {
    name?: string;
    slug?: string;
    thumbnail?: CategorySharedFile;
}
