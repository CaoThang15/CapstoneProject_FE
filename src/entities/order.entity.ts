import { OrderPaymentMethod, OrderStatus, PaymentStatus } from "~/constants/enums";
import { User } from "./person-info.entity";
import { BaseEntity } from "./base.entity";

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

export interface Order extends BaseEntity {
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
    receiveTime?: Date;
    seller?: User;
    statusId: OrderStatus;
    statusName: string;
    voucherId?: number;
    discountAmount?: number;
    orderDetails: OrderDetail[];
    paymentStatus: PaymentStatus;
    canPayout?: boolean;
}
