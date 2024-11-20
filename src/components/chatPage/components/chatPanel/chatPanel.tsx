import { useAtom } from 'jotai';
import { currentChatAtom, openStickerPanelAtom } from '@jotai/atoms';
import './chatPanel.scss';
import sendIcon from '@icons/send.svg';
import { useEffect, useMemo, useState } from 'react';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { MessageCardDto, RequestDto, ResponseDto } from './types';
import { GetMessageList } from './GetMessageList';
import { MessageCard } from '../messageCard/messageCard';
export function ChatPanel() {
    const [messageCardList1, setMessageCardList1] = useState<MessageCardDto[]>(
        [],
    );
    const [sortedMessageCardList1, setSortedessageCardList1] = useState<
        MessageCardDto[]
    >([]);

    const [OpenStickerPanel, setOpenStickerPanel] =
        useAtom(openStickerPanelAtom);
    const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);

    const { resData, loading, execute } = useApi<ResponseDto, RequestDto>(
        async (data) => {
            return axios.post('/api/chat/getChatInfo', data);
        },
    );

    const ShowStickers = async () => {
        setOpenStickerPanel(!OpenStickerPanel);
    };

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = '45px';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Установить новую высоту
    };

    const sortedMessageList = useMemo(() => {
        if (resData == null) return;
        return GetMessageList(resData);
    }, [resData]);

    useEffect(() => {
        if (currentChatId == -1) return;
        execute({ chatId: currentChatId });
    }, [currentChatId]);

    useEffect(() => {
        if (resData == null) return;
    }, [resData]);
    return (
        <div className="chatPanelContainer">
            <div className="chatPanelHeader">
                <div className="chatNameHeader">
                    <img
                        src="/static/defaults/userAvatars/defaultUserAvatar.jpg"
                        alt="chatAvatar"
                        className="chatAvatarHeader"
                    />
                    <p>Chat name + {currentChatId}</p>
                </div>
                <button className="chatSettingsButton">
                    <div className="settingPunkt punkt1"></div>
                    <div className="settingPunkt punkt2"></div>
                    <div className="settingPunkt punkt3"></div>
                </button>
            </div>
            <div className="messagesBlock">
                {sortedMessageList?.map((messageCard) => (
                    <>
                        <MessageCard cardData={messageCard} />
                    </>
                ))}
            </div>
            <div className="inputMessageBlockContainer">
                <div className="inputMessageBlock">
                    <button className="StickerButton" onClick={ShowStickers}>
                        Stickers
                    </button>
                    <textarea
                        className="inputMessage"
                        placeholder="Input message"
                        onInput={handleInput}
                    ></textarea>{' '}
                    <button className="sendButton" onSubmit={alert}>
                        <img src={sendIcon} alt="send message" />
                    </button>
                </div>
            </div>
        </div>
    );
}
