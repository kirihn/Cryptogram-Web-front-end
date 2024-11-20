import { useAtom } from 'jotai';
import { currentChatAtom, openStickerPanelAtom } from '@jotai/atoms';
import sendIcon from '@icons/send.svg';
import { useEffect, useMemo, useState } from 'react';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { RequestDto, ResponseDto } from './types';
import { GetMessageList } from './GetMessageList';
import { MyMessageCard } from '../myMessageCard/myMessageCard';
import { UserMessageCard } from '../userMessageCard/userMessageCard';
import './chatPanel.scss';

export function ChatPanel() {
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

    const getMembersCountText = (count: number): string => {
        if (count === 0) return 'Участников нет';

        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;

        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return `${count} участников`;
        } else if (lastDigit === 1) {
            return `${count} участник`;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return `${count} участника`;
        } else {
            return `${count} участников`;
        }
    };

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
                        src="/static/defaults/chatAvatars/defaultChatAvatar.jpg"
                        alt="chatAvatar"
                        className="chatAvatarHeader"
                    />
                    <div>
                        <p className="chatName">
                            {resData && resData.ChatName}
                        </p>
                        <p className="membersCount">
                            {resData &&
                                getMembersCountText(resData.ChatMembers.length)}
                        </p>
                    </div>
                </div>
                <button className="chatSettingsButton">
                    <div className="settingPunkt punkt1"></div>
                    <div className="settingPunkt punkt2"></div>
                    <div className="settingPunkt punkt3"></div>
                </button>
            </div>
            <div className="messagesBlock">
                {sortedMessageList?.map((messageCard) => {
                    return messageCard.isItMyMessage ? (
                        <MyMessageCard cardData={messageCard} />
                    ) : (
                        <UserMessageCard cardData={messageCard} />
                    );
                })}
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
