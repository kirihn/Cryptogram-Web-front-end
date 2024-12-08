export interface ResponseDto {
    ChatId: number;
    Role: number;
    IsFixed: boolean;
    ChatMemberId: number;
    ChatName: string;
    IsGroup: boolean;
    KeyHash: string;
    AvatarPath: string;
}

export interface ResponseChangeFixChatDto {
    message: string;
    chatMemberId: number;
    status: boolean;
}

export interface RequestChangeFixChatDto {
    chatMemberId: number;
}

export interface WSAddMember {
    message: string;
}

export interface WSDeleteMember {
    message: string;
    deletedChatId: number;
}