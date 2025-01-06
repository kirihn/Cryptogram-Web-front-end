export interface Props {
    handleSwitchModal: (modal: null) => void;
    handleCloseModal: () => void;
}

export interface ResponseDto{
    newName: string
}

export interface EditNameForm{
    name: string;
}