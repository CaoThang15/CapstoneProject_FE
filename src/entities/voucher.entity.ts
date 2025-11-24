import { BaseEntity } from "./base.entity";

export enum VoucherDiscountType {
    Percentage = "Percentage",
    Fixed = "Fixed",
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

    getUsagePercentage(): number {
        if (this.usageLimit === 0) return 0;
        return (this.usageCount / this.usageLimit) * 100;
    }

    getUsageLeftPercentage(): number {
        return 100 - this.getUsagePercentage();
    }

    getDiscountLabel(): string {
        if (this.discountType === VoucherDiscountType.Percentage) {
            return `${this.discountAmount}% off`;
        } else {
            return `$${this.discountAmount} off`;
        }
    }
}
