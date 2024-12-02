export interface Props {
    handleSwitchModal: (modal: null) => void;
    ChatInfo: ChatInfo;
    avatarType: string;
    myRole: number
}

export interface ChatInfo {
    ChatId: number;
    ChatName: string;
    IsGroup: boolean;
    KeyHash: string;
    AvatarPath: string;
    CreatedAt: string;
    UpdatedAt: string;
    ChatMembers: ChatMember[];
}

interface ChatMember {
    ChatMemberId: number;
    Role: number;
    ChatId: number;
    JoinedAt: string;
    Member: Member;
}

interface Member {
    UserId: string;
    Name: string;
    AvatarPath: string;
    UserName: string;
}

export interface RequestDto {
    chatId: number;
}

export interface RequestDeleteMemberDto {
    chatId: number;
    userId: string;
} 

export interface ResponseDto{
    message: string;
}

