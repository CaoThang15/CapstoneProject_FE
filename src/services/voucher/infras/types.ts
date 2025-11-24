import { Voucher } from "~/entities";

export interface ValidateVoucherResponse {
    message: string;
    voucher: Voucher;
}

export interface AssignVoucherRequest {
    voucherId: number;
    userId: number;
}
