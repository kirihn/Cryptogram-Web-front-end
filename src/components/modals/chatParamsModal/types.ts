export interface Props {
    handleSwitchModal: (modal: null) => void;
    ChatInfo: ChatInfo;
    avatarType: string;
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
