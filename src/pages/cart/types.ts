import { Product } from "~/entities/product.entity";

export interface LocalStorageCartItems {
    [k: string]: LocalStorageCartItem;
}

export interface LocalStorageCartItem {
    quantity: number;
}

export interface ProductCartItem extends Product {
    quantity: number;
}
