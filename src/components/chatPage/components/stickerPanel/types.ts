export interface StickerPack {
    StickerGroupId: number;
    GroupName: string;
    Stickers: Sticker[];
}

export interface Sticker {
    StickerId: number;
    StickerPath: string;
}

export interface SendMessageRequestDto {
    content: string;
    messageType: string;
    chatId: number;
}