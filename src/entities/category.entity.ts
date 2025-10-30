import { BaseEntity } from "./base.entity";

export interface Category extends BaseEntity {
    name?: string;
    slug?: string;
    imageUrl?: string;
}
