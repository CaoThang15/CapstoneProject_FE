import { ProductStatus } from "~/constants/enums";
import { BaseEntity } from "./base.entity";
import { User } from "./person-info.entity";

export interface SharedFile {
    name: string;
    path: string;
}

export interface ProductProperty {
    id: number;
    value: string;
    name: string;
}

export class Product extends BaseEntity {
    categoryId: number;
    name: string;
    price: number;
    slug: string;
    description: string;
    stockQuantity: number;
    note: string;
    location?: string;
    status: ProductStatus;
    isNew: boolean;
    isAdminHide: boolean;
    isHide: boolean;
    sellerId: number;
    seller: User;
    sharedFiles: SharedFile[];
    properties: ProductProperty[];
}
