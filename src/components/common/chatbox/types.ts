export enum SenderMessage {
    USER = "user",
    AI = "ai",
}

export interface Message {
    sender: SenderMessage;
    text: string;
}
