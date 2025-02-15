import {
    Props,
    RequestDeleteMsg,
    RequestUpdateMsg,
    ResponteDeleteMsg,
    ResponteUpdateMsg,
} from './types';
import './myMessageCard.scss';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { GetContextPosition } from '@utils/func/getContextPosition';
import axios from 'axios';
import { useApi } from 'hooks/useApi';
import { Decrypt } from '@utils/func/decrypt';
import { useAtomValue } from 'jotai';
import {
    currentChatAtom,
    keyValueActionsAtom,
    keyValueAtom,
    myUserIdAtom,
} from '@jotai/atoms';
import { Encrypt } from '@utils/func/encrypt';
import downloadIcon from '@assets/icons/downloadFileDark.svg';

export function MyMessageCard(props: Props) {
    const { cardData } = props;

    const [visibleContext, setVisibleContext] = useState(false);
    const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
    const [decrtyptMessage, setDecryptMessage] = useState<string>('???');
    const [CryptoKey, setCryptoKey] = useState<number>(0);
    const { getCryptoKey } = useAtomValue(keyValueActionsAtom);
    const currentChatId = useAtomValue(currentChatAtom);
    const currentUserId = useAtomValue(myUserIdAtom);
    const keyStorage = useAtomValue(keyValueAtom);

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
        navigator.clipboard.writeText(decrtyptMessage);
        setVisibleContext(false);
    };

    const handleDelete = async () => {
        DeleteMsgExecute({ MessageId: cardData.MessageId });
        setVisibleContext(false);
    };

    const handleEditMessage = async () => {
        const newMessage = await prompt('Update message', decrtyptMessage);

        if (decrtyptMessage === newMessage) return;

        if (newMessage == null) {
            return;
        } else if (newMessage == '') {
            DeleteMsgExecute({ MessageId: cardData.MessageId });
        } else {
            UpdateMsgExecute({
                MessageId: cardData.MessageId,
                newContent: Encrypt(newMessage, CryptoKey),
            });
        }

        setVisibleContext(false);
    };

    const renderMessageContent = () => {
        switch (cardData.MessageType) {
            case 'msg':
                return <p className="Content">{decrtyptMessage}</p>;
            case 'sticker':
                return <img src={decrtyptMessage} className="msgTypeSticker" />;
            case 'image':
                return (
                    <a href={cardData.Content} download>
                        <img src={cardData.Content} className="msgTypeImage" />
                    </a>
                );
            case 'audio':
                return (
                    <audio controls>
                        <source src={cardData.Content} />
                        Ваш браузер не поддерживает аудио.
                    </audio>
                );
            case 'video':
                return (
                    <video className="msgTypeVideo" controls>
                        <source src={cardData.Content} />
                    </video>
                );
            case 'file':
                return (
                    <a href={cardData.Content} download>
                        <div className="msgTypeDownloadFile">
                            <div className="imgContainer">
                                <img
                                    src={downloadIcon}
                                    alt="downloadIcon"
                                    className="downloadIcon"
                                />
                            </div>
                            <p className="downloadName">
                                {cardData.Content.split('EndTime')[1]}
                            </p>
                        </div>
                    </a>
                );
            default:
                return <p>Error</p>;
        }
    };

    useEffect(() => {
        const key = getCryptoKey(
            'KeyForChat-' + currentChatId + '-user-' + currentUserId,
        );
        if (!key) {
            setDecryptMessage(
                '!!!Cannot decrypt this message (try to add cryptoKey)!!!',
            );
            return;
        }

        setCryptoKey(key);

        setDecryptMessage(Decrypt(cardData.Content, key));
    }, [props.cardData, keyStorage]);
    return (
        <div
            className="myMessageContainer rigth"
            onContextMenu={handleContextMenu}
        >
            <div
                style={
                    cardData.MessageType === 'sticker'
                        ? { background: 'none' }
                        : undefined
                }
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
                {/* {cardData.MessageType == 'msg' ? (
                    <p className="Content">{decrtyptMessage}</p>
                ) : cardData.MessageType == 'sticker' ? (
                    <img src={decrtyptMessage} className="msgTypeSticker" />
                ) : (
                    <p>Error</p>
                )} */}
                {renderMessageContent()}
                <p className="messageInfo">
                    {cardData.IsUpdate && (
                        <span className="isUpdate">Ред. </span>
                    )}
                    <span className="sendTime">
                        {dayjs(cardData.CreatedAt).format('HH:mm')}
                    </span>
                </p>
            </div>

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
                    {cardData.MessageType == 'msg' && (
                        <button onClick={handleCopy}>копировать</button>
                    )}
                    {cardData.MessageType == 'msg' && (
                        <button onClick={handleEditMessage}>
                            Редактировать
                        </button>
                    )}
                    {['file', 'video', 'audio', 'image'].includes(
                        cardData.MessageType,
                    ) && (
                        <a href={cardData.Content} download={cardData.Content}>
                            скачать
                        </a>
                    )}
                    <button onClick={handleDelete}>Удалить везде</button>
                </div>
            )}

            {visibleContext && (
                <div
                    className="overlay"
                    onClick={handleClickOutside}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        handleClickOutside();
                    }}
                ></div>
            )}
        </div>
    );
}
