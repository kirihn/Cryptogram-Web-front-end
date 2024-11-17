export interface Props {
    handleSwitchModal: (modal: null) => void;
    avatarType: string;
}

export interface EditAvatarForm {
    file: FileList;
}

export interface ResponseDto {
    newAvatarPath: string;
}
