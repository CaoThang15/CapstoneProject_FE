import { BaseEntity } from "./base.entity";
import { User } from "./person-info.entity";
import { Product } from "./product.entity";
import { SharedFile } from "./shared-file.entity";

export class Feedback extends BaseEntity {
    content: string;
    rate: number;
    productInfo: Product;
    user: User;
    sharedFile: SharedFile;
}
