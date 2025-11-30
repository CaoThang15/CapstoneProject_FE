import { Voucher } from "~/entities";
import { CreateOrderRequest } from "~/services/orders/infras";

export type CreateOrderRequestFormValue = CreateOrderRequest & {
    ward?: string;
    province?: string;
    voucher?: Voucher;
};
