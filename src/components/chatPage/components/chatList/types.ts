export interface ResponseDto {
    ChatId: number;
    Role: number;
    IsFixed: boolean;
    ChatMemberId: number;
    ChatName: string;
    IsGroup: boolean;
    KeyHash: string;
}

export interface ResponseChangeFixChatDto {
    message: string;
    chatMemberId: number,
    status: boolean,
}

export interface RequestChangeFixChatDto {
    chatMemberId: number;
}
