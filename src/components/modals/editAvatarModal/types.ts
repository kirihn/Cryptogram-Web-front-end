export interface Props {
    handleSwitchModal: (modal: null) => void;
    avatarType: string;
}

export interface EditAvatarForm {
    avatar: FileList;
}

export interface ResponseDto {
    newAvatarPath: string;
}
