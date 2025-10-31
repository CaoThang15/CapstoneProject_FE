import { BaseEntity } from "./base.entity";

export enum VoucherDiscountType {
    Percentage,
    Fixed,
}

export class Voucher extends BaseEntity {
    code: string;
    description?: string;
    discountType: VoucherDiscountType;
    discountAmount: number;
    startDate: string;
    endDate: string;
    usageLimit: number;
    usageCount: number;
    statusId: number;
    statusName: string;
    isActive: boolean;

    getDiscount(amount: number): number {
        if (!this.isActive) return 0;

        if (this.discountType === VoucherDiscountType.Percentage) {
            return (amount * this.discountAmount) / 100;
        }

        // Fixed discount
        return Math.min(this.discountAmount, amount);
    }
}
