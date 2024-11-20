import { Props } from './types';
import './myMessageCard.scss';
import dayjs from 'dayjs';
export function MyMessageCard(props: Props) {
    const { cardData } = props;

    const handleRightMyMsgClick = () => alert(1);
    return (
        <div
            className="messageContainer rigth"
            onContextMenu={(event) => {
                event.preventDefault(); // Отключение стандартного меню
                handleRightMyMsgClick(); // Вызов вашего обработчика
            }}
        >
            <div
                className={`ContentContainer 
                            ${
                                cardData.isItFirstMessage
                                    ? 'isItFirstMessage'
                                    : ''
                            } 
                            ${cardData.isItLastMessage ? 'isItLastMessage' : ''}
                            ${cardData.isItMyMessage ? 'isItMyMessage' : ''}`}
            >
                <p className="Content">{cardData.Content}</p>
                <p className="sendTimeMe">
                    {dayjs(cardData.CreatedAt).format('HH:mm')}
                </p>
            </div>

            {cardData.isItLastMessage ? (
                <div className="emptyEngle"></div>
            ) : (
                <div className="engle"></div>
            )}
        </div>
    );
}
