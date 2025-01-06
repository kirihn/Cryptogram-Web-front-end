export interface Props {
    handleSwitchModal: (modal: null) => void;
    handleCloseModal: () => void;
    avatarType: string;
    chatId?: number
}

export interface EditAvatarForm {
    avatar: FileList;
}

export interface ResponseDto {
    newAvatarPath: string;
}
