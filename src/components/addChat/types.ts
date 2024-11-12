export interface ResponseDto {
    ChatId: number;
    ChatName: string;
    KeyHash: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export interface CreateChatFormDto {
    chatName: string;
    isGroup: boolean;
    keyHash: string;
}
