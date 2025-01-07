export interface Props {
    handleSwitchModal: (modal: null) => void;
    handleCloseModal: () => void;
}

export interface ResponseDto {
    newLanguage: string;
}

export interface RequestDto {
    language: string;
}

