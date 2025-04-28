export interface Props {
    handleSwitchModal: (modal: null) => void;
    handleCloseModal: () => void;
    chatData:  chatData
}

export interface chatData{
    ChatId: number;
    ChatName: string;
    IsGroup: boolean;
    KeyHash: string;
    AvatarPath: string;
    CreatedAt: string;
    UpdatedAt: string;
    ChatMembers: ChatMember[];
    ChatMessages: ChatMessage[];
}

export interface ChatMember {
    ChatMemberId: number;
    Role: number;
    ChatId: number;
    JoinedAt: string; // ISO Date string
    Member: Member;
}

export interface Member {
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