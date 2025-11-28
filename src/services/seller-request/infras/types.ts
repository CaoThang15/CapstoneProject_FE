import { SharedFile } from "~/entities";
import { SellerRequestStatus } from "~/entities/seller-request.entity";
import { IPaginationRequest } from "~/libs/axios/types";
import { LegalType } from "~/pages/seller/on-boarding/types";

export interface CreateSellerOnboardingRequestDto {
    fullName: string;
    email: string;
    phoneNumber: string;
    businessAddress: string;
    storeName: string;
    primaryCategoryId: number;
    storeDescription: string;
    legalType: LegalType;
    taxId: string;
    identityCardId: string;
    identityCardFrontImage: SharedFile;
    identityCardBackImage: SharedFile;
    businessLicenseImages: SharedFile[];
    bankCode: number;
    bankAccountNumber: string;
    bankAccountName: string;
}

export interface GetAllSellerRequestDto extends IPaginationRequest {
    searchTerm?: string;
    sellerRequestStatus?: SellerRequestStatus;
}

export interface CreateSellerRequestResponseDto {
    isApproved: boolean;
    internalNote: string;
    messageToSeller: string;
}
