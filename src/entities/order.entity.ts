import { OrderPaymentMethod, OrderStatus } from "~/constants/enums";
import { User } from "./person-info.entity";

export interface OrderDetail {
    id: number;
    productId: number;
    productName?: string;
    productImagePath?: string;
    productImageName?: string;
    quantity: number;
    unitPrice: number;
    discount: number;
}

export interface Order {
    id: number;
    orderDate: string;
    deliveryDate: string;
    shippingAddress: string;
    wardId: number;
    note?: string;
    name?: string;
    phoneNumber: string;
    paymentMethod: OrderPaymentMethod;
    totalAmount: number;
    customerId: number;
    customer: User;
    sellerId?: number;
    seller?: User;
    statusId: OrderStatus;
    statusName: string;
    voucherId?: number;
    discountAmount?: number;
    createdAt: string;
    updatedAt?: string;
    orderDetails: OrderDetail[];
}
