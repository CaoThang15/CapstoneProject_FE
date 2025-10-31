export enum Gender {
    FEMALE,
    MALE,
}

export enum TestResultStatus {
    POSITIVE = "positive",
    NEGATIVE = "negative",
}

export enum PaymentMethod {
    CASH = 0,
    ATM,
    TRANSFER = 3,
}

export enum ReceiptPaymentType {
    PAID,
    UNPAID,
    REFUND,
    CANCEL,
}

export enum UploadedFileType {
    REPORT = "Report",
    STATISTICS = "Statistics",
    SUPPLIER = "Supplier",
    CONTRACT = "Contract",
}

export enum ProductStatus {
    PENDING,
    APPROVED,
    REJECTED,
}

export enum HospitalServiceType {
    Exam,
    Injection,
    Test,
}

export enum PaymentStatus {
    COMPLETED,
    CANCELLED,
    ADJUSTED,
    PENDING,
}

export enum OrderStatus {
    PendingConfirmation = 2,
    PendingShipment,
    Shipping,
    Delivered,
    Returned,
    Cancelled,
}

export enum CloudinaryFolder {
    PROFILE = "profile",
    CATEGORY = "category",
    PRODUCT = "product",
}

export enum PaginationOrderBy {
    ASC = "asc",
    DESC = "desc",
}

export enum OrderPaymentMethod {
    CASH = "CASH",
    CREDIT = "CREDIT",
    DEBIT = "DEBIT",
}
