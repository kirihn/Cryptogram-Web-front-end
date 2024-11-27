import { MessageCardDto } from '../chatPanel/types';

export interface Props {
    cardData: MessageCardDto;
}

export interface ResponseTranslationDto {
    responseData: {
        translatedText: string;
        match: number;
    };
}

export interface RequestTranstalionDto {
    q: string;
    langpair: string;
}
