import { MessageCardDto } from '../chatPanel/types';

export interface Props {
    cardData: MessageCardDto;
    key: number;
}

export interface ResponteDeleteMsg {
    message: string;
}

export interface RequestDeleteMsg {
    MessageId: number;
}

export interface ResponteUpdateMsg {
    message: string;
}

export interface RequestUpdateMsg {
    MessageId: number;
    newContent: string;
}
