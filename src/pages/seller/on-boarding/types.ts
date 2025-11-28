import { UploadedFile } from "~/services/public-api/upload-file/infras";

export enum LegalType {
    INDIVIDUAL,
    BUSINESS_HOUSEHOLD,
    CORPORATION,
}

export interface SellerOnboardingFormValues {
    fullName: string;
    email: string;
    phoneNumber: string;
    ward?: string;
    province?: string;
    businessAddress: string;
    storeName: string;
    primaryCategoryId: number;
    primaryCategoryName?: string;
    secondaryCategoryIds: number[];
    storeDescription: string;
    legalType: number;
    taxId: string;
    identityCardId: string;
    identityCardFrontImage: UploadedFile;
    identityCardBackImage: UploadedFile;
    businessLicenseImages?: UploadedFile[];
    bankCode: number;
    bankAccountNumber: string;
    bankAccountName: string;
}
