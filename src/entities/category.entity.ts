import { BaseEntity } from "./base.entity";

export class Category extends BaseEntity {
    name?: string;
    slug?: string;
    imageUrl?: string;
}
