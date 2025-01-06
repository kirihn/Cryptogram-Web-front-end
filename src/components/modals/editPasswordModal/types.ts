export interface Props {
    handleSwitchModal: (modal: null) => void;
    handleCloseModal: () => void;
}

export interface ResponseDto {
    message: string;
}

export interface EditPasswordForm {
    oldPassword: string;
    password: string;
    repeatPassword: string;
}
