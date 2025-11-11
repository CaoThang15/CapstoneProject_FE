export class BaseEntity {
    id: number;
    isSuspended?: boolean;
    isCancelled?: boolean;
    createdAt?: Date;
    lastUpdatedAt?: Date;
    createdBy: number;
    lastUpdatedBy: number;

    static fromJson<T extends BaseEntity>(this: new () => T, json: Partial<T>): T {
        const entity = new this();
        Object.assign(entity, json);

        if (json.createdAt) entity.createdAt = new Date(json.createdAt);
        if (json.lastUpdatedAt) entity.lastUpdatedAt = new Date(json.lastUpdatedAt);

        return entity;
    }
}
