import { Product } from "~/entities/product.entity";

export interface GetListProductsResponse {
    items: Product[];
    hasMoreRecords: boolean;
    total: number;
}
