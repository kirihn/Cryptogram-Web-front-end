export interface ResponseDto {
  ChatId: number;
  Role: number;
  IsFixed: boolean;
  ChatMemberId: number;
  ChatName: string;
  IsGroup: boolean;
  KeyHash: string;
  AvatarPath: string;
  ChatMembers: ChatMember[];
  ChatMessages: {
    Content?: string;
    MessageType?: string;
  }[];
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

export interface ChatMessage {
  MessageId: number;
  Content: string;
  MessageType: string; // You can use a union type like "msg" | "file" if needed
  IsUpdate: boolean;
  IsRead: boolean;
  CreatedAt: string; // ISO Date string
  SenderId: string;
}

export interface WSNewMessage {
  message: ChatMessage;
  chatId: number;
}
