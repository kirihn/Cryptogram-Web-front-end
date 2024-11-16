export interface Props {
    handleSwitchModal: (modal: null) => void;
}

export interface ResponseDto {
    message: string;
}

export interface EditPasswordForm {
    oldPassword: string;
    password: string;
    repeatPassword: string;
}
