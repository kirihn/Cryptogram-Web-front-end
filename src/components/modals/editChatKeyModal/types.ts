export interface Props {
    handleSwitchModal: (modal: null) => void;
    isChangedChatId: boolean;
}

export interface ResponseDto {}

export interface RequestDto {
    keyHash: string;
    chatId: number;
}
