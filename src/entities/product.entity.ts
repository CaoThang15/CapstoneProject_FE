import { BaseEntity } from "./base.entity";

export interface SharedFile {
    name: string;
    path: string;
}

export interface ProductProperty {
    id: number;
    value: string;
    propertyId: number;
    propertyName: string;
}

export interface Product extends BaseEntity {
    id: number;
    categoryId: number;
    name: string;
    price: number;
    slug: string;
    description: string;
    stockQuantity: number;
    note: string;
    isNew: boolean;
    isAdminHide: boolean;
    isHide: boolean;
    sellerId: number;
    sharedFiles: SharedFile[];
    properties: ProductProperty[];
}
