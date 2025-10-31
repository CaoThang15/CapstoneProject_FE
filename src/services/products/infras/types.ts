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
    sellerId?: boolean;
    order?: string;
    orderBy?: PaginationOrderBy;
    page?: number;
    pageSize?: number;
}

export interface UpsertProductProperty {
    propertyName: string;
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
    sharedFiles: SharedFile[];
    properties: UpsertProductProperty[];
}
