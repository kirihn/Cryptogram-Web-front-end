import { Props } from './types';
import './userMessageCard.scss';
import dayjs from 'dayjs';
export function UserMessageCard(props: Props) {
    const { cardData } = props;

    const handleRightMyMsgClick = () => alert(1);
    return (
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
    );
}
