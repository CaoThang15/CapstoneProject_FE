import { Voucher } from "~/entities";

export interface ValidateVoucherResponse {
    message: string;
    voucher: Voucher;
}
