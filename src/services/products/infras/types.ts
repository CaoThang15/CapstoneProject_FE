import { PaginationOrderBy } from "~/constants/enums";
import { Product } from "~/entities/product.entity";
import { SharedFile } from "../../../entities/product.entity";

export interface GetListProductsResponse {
    items: Product[];
    hasMoreRecords: boolean;
    total: number;
}

export interface GetProductWithPaginationRequest {
    categoryId?: number;
    keyword?: string;
    minPrice?: string;
    maxPrice?: string;
    isNew?: boolean;
    isHide?: boolean;
    isAdminHide?: boolean;
    sellerId?: number;
    order?: string;
    orderBy?: PaginationOrderBy;
    page?: number;
    pageSize?: number;
}

export interface CreateProductProperty {
    name: string;
    value: string;
}
export interface CreateProductRequest {
    categoryId: number;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    note: string;
    sellerId: number;
    location?: string;
    sharedFiles: SharedFile[];
    properties: CreateProductProperty[];
}

export interface UpdateProductProperty {
    id?: number;
    name: string;
    value: string;
}

export interface UpdateProductRequest {
    id: number;
    categoryId: number;
    name: string;
    price: number;
    description: string;
    stockQuantity: number;
    note: string;
    location?: string;
    sellerId: number;
    sharedFiles: SharedFile[];
    properties: UpdateProductProperty[];
}

export interface GenerateProductDescriptionRequest {
    categoryName?: string;
    name?: string;
    price: number;
    description?: string;
    note?: string;
    isNew: boolean;
    properties?: {
        value: string;
        name: string;
    }[];
}
