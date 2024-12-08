import {
    Props,
    RequestDeleteMsg,
    RequestUpdateMsg,
    ResponteDeleteMsg,
    ResponteUpdateMsg,
} from './types';
import './myMessageCard.scss';
import dayjs from 'dayjs';
import { useState } from 'react';
import { GetContextPosition } from '@utils/func/getContextPosition';
import axios from 'axios';
import { useApi } from 'hooks/useApi';

export function MyMessageCard(props: Props) {
    const { cardData } = props;

    const [visibleContext, setVisibleContext] = useState(false);
    const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });

    const {
        resData: DeleteMsgResData,
        loading: DeleteMsgLoading,
        execute: DeleteMsgExecute,
    } = useApi<ResponteDeleteMsg, RequestDeleteMsg>(async (data) => {
        return axios.delete('/api/chat/DeleteMessage', { data });
    });

    const {
        resData: UpdateMsgResData,
        loading: UpdateMsgLoading,
        execute: UpdateMsgExecute,
    } = useApi<ResponteUpdateMsg, RequestUpdateMsg>(async (data) => {
        return axios.put('/api/chat/UpdateMessage', data);
    });

    const handleContextMenu = async (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        event.preventDefault();

        setContextPosition(GetContextPosition(125, 175, event));
        setVisibleContext(true);
    };

    const handleClickOutside = async () => {
        setVisibleContext(false);
    };

    const handleCopy = async () => {
        navigator.clipboard.writeText(cardData.Content);
        setVisibleContext(false);
    };

    const handleDelete = async () => {
        DeleteMsgExecute({ MessageId: cardData.MessageId });
        setVisibleContext(false);
    };

    const handleEditMessage = async () => {
        const newMessage = await prompt('Update message', cardData.Content);

        if (cardData.Content === newMessage) return;

        if (newMessage == null || newMessage == '') {
            DeleteMsgExecute({ MessageId: cardData.MessageId });
        } else {
            UpdateMsgExecute({
                MessageId: cardData.MessageId,
                newContent: newMessage,
            });
        }

        setVisibleContext(false);
        return;
    };

    return (
        <div
            className="myMessageContainer rigth"
            onContextMenu={handleContextMenu}
        >
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
                <p className="Content">{cardData.Content}</p>
                <p className="messageInfo">
                    {cardData.IsUpdate && (
                        <span className="isUpdate">Ред. </span>
                    )}
                    <span className="sendTime">
                        {dayjs(cardData.CreatedAt).format('HH:mm')}
                    </span>
                </p>
            </div>

            {/* Мини-меню */}
            {visibleContext && (
                <div
                    className="miniMenu"
                    style={{
                        position: 'absolute',
                        top: contextPosition.y,
                        left: contextPosition.x,
                    }}
                >
                    <button
                        onClick={() => {
                            setVisibleContext(false);
                        }}
                    >
                        назад
                    </button>
                    <button onClick={handleCopy}>копировать</button>
                    <button onClick={handleEditMessage}>Редактировать</button>
                    <button onClick={handleDelete}>Удалить везде</button>
                </div>
            )}

            {/* Обработка кликов вне мини-меню */}
            {visibleContext && (
                <div
                    className="overlay"
                    onClick={handleClickOutside}
                    onContextMenu={(e) => {
                        e.preventDefault(); // Отключаем стандартное контекстное меню
                        handleClickOutside(); // Закрываем меню
                    }}
                ></div>
            )}
        </div>
    );
}
