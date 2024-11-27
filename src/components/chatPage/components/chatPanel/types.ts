export interface GetChatInfoRequestDto {
    chatId: number;
}
export interface GetChatInfoResponseDto {
    ChatId: number;
    ChatName: string;
    IsGroup: boolean;
    KeyHash: string;
    CreatedAt: string; // ISO Date string
    UpdatedAt: string; // ISO Date string
    ChatMembers: ChatMember[];
    ChatMessages: ChatMessage[];
}

interface ChatMember {
    ChatMemberId: number;
    Role: number;
    ChatId: number;
    JoinedAt: string; // ISO Date string
    Member: Member;
}

interface Member {
    UserId: string;
    Name: string;
    AvatarPath: string;
    UserName: string;
}

export interface ChatMessage {
    MessageId: number;
    Content: string;
    MessageType: string; // You can use a union type like "msg" | "file" if needed
    IsUpdate: boolean;
    IsRead: boolean;
    CreatedAt: string; // ISO Date string
    SenderId: string;
}

export interface ResponseFromWSNewMessage {
    message: ChatMessage;
    chatId: number;
}

export interface MessageCardDto {
    MessageId: number;
    Content: string;
    MessageType: string; // You can use a union type like "msg" | "file" if needed
    IsUpdate: boolean;
    IsRead: boolean;
    CreatedAt: string; // ISO Date string
    SenderId: string;
    SenderAvatarPath: string;
    SenderName: string;
    isItMyMessage: boolean;
    isItFirstMessage: boolean;
    isItLastMessage: boolean;
}

export interface SendMessageRequesDto {
    content: string;
    messageType: string;
    chatId: number;
}
