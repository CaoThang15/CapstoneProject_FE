import { LegalType } from "~/pages/seller/on-boarding/types";
import { BaseEntity } from "./base.entity";
import { User } from "./person-info.entity";
import { SharedFile } from "./shared-file.entity";
import { Category } from "./category.entity";

export enum SellerRequestStatus {
    PENDING,
    APPROVED,
    REJECTED,
}

export class SellerRequest extends BaseEntity {
    fullName: string;
    email: string;
    phoneNumber: string;
    businessAddress: string;
    storeName: string;
    primaryCategoryId: number;
    primaryCategory: Category;
    storeDescription: string;
    legalType: LegalType;
    taxId: string;
    identityCardId: string;
    identityCardFrontImage: SharedFile;
    identityCardBackImage: SharedFile;
    businessLicenseImages: SharedFile[];
    userId: number;
    user: User;
    sellerRequestStatus: SellerRequestStatus;

    get legalTypeName(): string {
        switch (this.legalType) {
            case LegalType.INDIVIDUAL:
                return "Cá nhân";
            case LegalType.BUSINESS_HOUSEHOLD:
                return "Hộ kinh doanh";
            case LegalType.CORPORATION:
                return "Công ty";
            default:
                return "Unknown";
        }
    }

    get statusName(): string {
        switch (this.sellerRequestStatus) {
            case SellerRequestStatus.PENDING:
                return "Đang chờ xử lý";
            case SellerRequestStatus.APPROVED:
                return "Đã phê duyệt";
            case SellerRequestStatus.REJECTED:
                return "Đã từ chối";
        }
    }
}
