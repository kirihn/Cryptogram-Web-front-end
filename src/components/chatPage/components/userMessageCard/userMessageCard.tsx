import { GetContextPosition } from '@utils/func/getContextPosition';
import { Props, RequestTranstalionDto, ResponseTranslationDto } from './types';
import './userMessageCard.scss';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useApi } from 'hooks/useApi';
import Loader from '@components/loader/loader';
import { Decrypt } from '@utils/func/decrypt';
import { useAtomValue } from 'jotai';
import {
    currentChatAtom,
    keyValueActionsAtom,
    keyValueAtom,
    LangModeAtom,
    myUserIdAtom,
} from '@jotai/atoms';
import { GetLangCode } from '@utils/func/getLangCode';
export function UserMessageCard(props: Props) {
    const { cardData } = props;

    const [visibleContext, setVisibleContext] = useState(false);
    const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
    const [decrtyptMessage, setDecryptMessage] = useState<string>('???');
    const [сryptoKey, setCryptoKey] = useState<number>(0);

    const { getCryptoKey } = useAtomValue(keyValueActionsAtom);
    const currentChatId = useAtomValue(currentChatAtom);
    const currentUserId = useAtomValue(myUserIdAtom);
    const keyStorage = useAtomValue(keyValueAtom);
    const langMode = useAtomValue(LangModeAtom);
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

        const langCode = GetLangCode(decrtyptMessage);

        if (langCode === 'unknown') {
            setResData({
                responseData: { translatedText: 'cannot translate', match: 0 },
            });
            return;
        }
        getTranslateObject({
            q: decrtyptMessage,
            //langpair: `${langFrom}|${langTo}`,
            langpair: langCode + `|` + langMode,
        });
    };

    const handleCopy = async () => {
        navigator.clipboard.writeText(decrtyptMessage);
        setVisibleContext(false);
    };

    useEffect(() => {
        return () => {
            setResData(null);
        };
    }, []);

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
                {cardData.MessageType == 'msg' ? (
                    <>
                        <p className="senderName">{cardData.SenderName}</p>
                        <p className="Content">{decrtyptMessage}</p>
                    </>
                ) : cardData.MessageType == 'sticker' ? (
                    <img src={decrtyptMessage} className="msgTypeSticker" />
                ) : (
                    <p>Error</p>
                )}

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
