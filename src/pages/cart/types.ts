import { Product } from "~/entities/product.entity";

export interface LocalStorageCartItems {
    [k: string]: LocalStorageCartItem;
}

export interface LocalStorageCartItem {
    quantity: number;
    sellerId?: number;
}

export interface ProductCartItem extends Product {
    quantity: number;
}
