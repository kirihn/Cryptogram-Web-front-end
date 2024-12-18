import { Props } from './types';
import './messageCard.scss';
import dayjs from 'dayjs';

export function MessageCard(props: Props) {
    const { cardData } = props;
    const handleRightMyMsgClick = () => alert(1);

    return (
        <>
            {cardData.isItMyMessage ? ( // my message
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
            ) : (
                // else Message
                <div className="messageContainer">
                    {cardData.isItLastMessage ? (
                        <img
                            src="/static/defaults/userAvatars/defaultUserAvatar.jpg"
                            alt="chatAvatar"
                            className="chatAvatarHeader"
                        />
                    ) : (
                        <div className="chatAvatarHeader"></div>
                    )}

                    <div
                        className={`ContentContainer 
                            ${
                                cardData.isItFirstMessage
                                    ? 'isItFirstMessage'
                                    : ''
                            } 
                            ${
                                cardData.isItLastMessage
                                    ? 'isItLastMessage'
                                    : ''
                            }`}
                    >
                        <p className="senderName">{cardData.SenderName}</p>
                        <p className="Content">{cardData.Content}</p>
                        <p className="sendTime">
                            {dayjs(cardData.CreatedAt).format('HH:mm')}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
