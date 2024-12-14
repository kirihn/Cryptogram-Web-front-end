import { GetContextPosition } from '@utils/func/getContextPosition';
import { Props, RequestTranstalionDto, ResponseTranslationDto } from './types';
import './userMessageCard.scss';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from 'hooks/useApi';
import Loader from '@components/loader/loader';
import { Decrypt } from '@utils/func/decrypt';
export function UserMessageCard(props: Props) {
    const { cardData } = props;

    const [visibleContext, setVisibleContext] = useState(false);
    const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });

    const {
        resData: translateObject,
        setResData,
        loading: translating,
        execute: getTranslateObject,
    } = useApi<ResponseTranslationDto, RequestTranstalionDto>(async (data) => {
        return await axios.get('https://api.mymemory.translated.net/get', {
            params: data,
        });
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

    const handleTranslate = () => {
        setVisibleContext(false);

        getTranslateObject({
            q: cardData.Content,
            //langpair: `${langFrom}|${langTo}`,
            langpair: `en|ru`,
        });
    };

    const handleCopy = async () => {
        navigator.clipboard.writeText(cardData.Content);
        setVisibleContext(false);
    };

    useEffect(() => {
        return () => {
            setResData(null);
        };
    }, []);

    return (
        <div className="userMessageContainer" onContextMenu={handleContextMenu}>
            {cardData.isItLastMessage ? (
                <img
                    src={cardData.SenderAvatarPath}
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
                <p className="Content">
                    {Decrypt(cardData.Content, 5795362847568494)}
                </p>

                {translating && <Loader />}
                {translateObject && (
                    <div className="translateContainer">
                        <hr />
                        <p className="translateContent Content">
                            {translateObject?.responseData.translatedText}
                        </p>
                    </div>
                )}
                <p className="messageInfo">
                    <span className="sendTime">
                        {dayjs(cardData.CreatedAt).format('HH:mm')}
                    </span>
                    {cardData.IsUpdate && (
                        <span className="isUpdate"> ред.</span>
                    )}
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
                    <button onClick={handleTranslate}>перевести</button>
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
