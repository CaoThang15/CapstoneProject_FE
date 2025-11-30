import { BaseEntity } from "./base.entity";

export enum NotificationType {
    General = 1,
    Voucher = 2,
    Order = 3,
    Payment = 4,
}

export class Notification extends BaseEntity {
    message: string;
    type: NotificationType;
    isRead: boolean;
    actionUrl?: string;
    metadata?: Record<string, any>;
}

export class ApiNotification extends BaseEntity {
    systemNotificationId: number;
    type: NotificationType;
    content: string;
    isRead: boolean;
    idRefer: number | null;
    sendAt: string;
}
