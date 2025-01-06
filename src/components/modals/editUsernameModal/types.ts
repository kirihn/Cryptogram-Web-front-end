export interface Props {
    handleSwitchModal: (modal: null) => void;
    handleCloseModal: () => void;
}

export interface ResponseDto {
    newUserame: string;
}

export interface EditUserameForm {
    username: string;
}
