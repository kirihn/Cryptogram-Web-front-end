export interface Props {
    handleSwitchModal: (modal: null) => void;
}

export interface ResponseDto{
    newName: string
}

export interface RequestDto{
    chatName: string;
    chatId: number;
}