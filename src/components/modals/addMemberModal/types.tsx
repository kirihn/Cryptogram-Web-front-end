export interface Props {
    handleSwitchModal: (modal: null) => void;
    myRole: number;
    chatId: number;
}

export interface ResponseDto {
    newName: string;
}

export interface AddMemberForm {
    username: string;
    role: number;
}

export interface RequestDto {
    username: string;
    chatId: number;
    role: number;
}

