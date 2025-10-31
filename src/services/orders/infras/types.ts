import { OrderPaymentMethod, OrderStatus } from "~/constants/enums";
import { IPaginationRequest, ISearchKeywordRequest } from "~/libs/axios/types";

export interface CreateOrderRequest {
    fullName: string;
    note?: string;
    orderDate: Date;
    deliveryDate?: Date;
    shippingAddress: string;
    phoneNumber: string;
    paymentMethod: OrderPaymentMethod;
    totalAmount: number;
    userId: number;
    voucherId?: number | null;
    statusId?: OrderStatus;
    orderDetails: OrderDetailRequest[];
}

export interface OrderDetailRequest {
    id?: number;
    productId: number;
    productName?: string;
    productImagePath?: string;
    productImageName?: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
}

export interface GetOrdersRequest extends ISearchKeywordRequest, IPaginationRequest {
    paymentMethodCode?: number;
    statusId?: OrderStatus;
}
