import { useAtom, useAtomValue } from 'jotai';
import {
    currentChatAtom,
    openStickerPanelAtom,
    socketAtom,
} from '@jotai/atoms';
import sendIcon from '@icons/send.svg';
import { useEffect, useMemo, useState } from 'react';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import {
    ChatMessage,
    GetChatInfoRequestDto,
    GetChatInfoResponseDto,
    ResponseFromWSNewMessage,
    SendMessageRequesDto,
} from './types';
import { GetMessageList } from './GetMessageList';
import { MyMessageCard } from '../myMessageCard/myMessageCard';
import { UserMessageCard } from '../userMessageCard/userMessageCard';
import './chatPanel.scss';
import { ChatParamModal } from '@components/modals/chatParamsModal/chatParamsModal';
import { getMembersCountText } from '@utils/func/getMembersCountText';

export function ChatPanel() {
    const [switchModal, setSwitchModal] = useState<string | null>(
        'ChatParamModal',
    );

    const [contentText, setContentText] = useState('');
    const [OpenStickerPanel, setOpenStickerPanel] =
        useAtom(openStickerPanelAtom);
    const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);
    const socket = useAtomValue(socketAtom);

    const { resData, setResData, loading, execute } = useApi<
        GetChatInfoResponseDto,
        GetChatInfoRequestDto
    >(async (data) => {
        return axios.post('/api/chat/getChatInfo', data);
    });

    const {
        resData: sendMessageData,
        loading: sendmessageLoading,
        execute: sendMessageExecute,
    } = useApi<any, SendMessageRequesDto>(async (data) => {
        return axios.post('/api/chat/sendMessage', data);
    });

    const handleSwitchModal = (modal: string | null) => {
        setSwitchModal(modal);
    };

    const ShowStickers = async () => {
        setOpenStickerPanel(!OpenStickerPanel);
    };

    const handleInput = async (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        const textarea = event.target;
        await setContentText(textarea.value);
        textarea.style.height = '45px';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    };

    const handleSendMessage = () => {
        if (contentText.trim() == '') return;
        sendMessageExecute({
            content: contentText,
            messageType: 'msg',
            chatId: currentChatId,
        });
        setContentText('');
    };

    const handleKeyDown = async (
        event: React.KeyboardEvent<HTMLTextAreaElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const sortedMessageList = useMemo(() => {
        if (resData == null) return;
        console.log(resData);
        return GetMessageList(resData);
    }, [resData]);

    useEffect(() => {
        if (currentChatId == -1) return;
        execute({ chatId: currentChatId });
        console.log(currentChatId);
    }, [currentChatId]);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (message: ResponseFromWSNewMessage) => {
            alert(window.location.origin);
            //alert("curChatId" + currentChatId+ "wsChatId - " + message.chatId)
            if (currentChatId != message.chatId) return;
            setResData((prevResData) => {
                if (!prevResData) return null;

                return {
                    ...prevResData,
                    ChatMessages: [
                        ...prevResData.ChatMessages,
                        message.message,
                    ],
                };
            });
        };

        socket.on('NewMessage', handleMessage);

        return () => {
            socket.off('NewMessage');
        };
    }, [socket, currentChatId]);

    return (
        <div className="chatPanelContainer">
            <div className="chatPanelHeader">
                <div className="chatNameHeader">
                    <img
                        src={
                            resData
                                ? resData.AvatarPath
                                : '/static/defaults/chatAvatars/errorChatAvatar.png'
                        }
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
                <button
                    className="chatSettingsButton"
                    onClick={() => {
                        handleSwitchModal('ChatParamModal');
                    }}
                >
                    <div className="settingPunkt punkt1"></div>
                    <div className="settingPunkt punkt2"></div>
                    <div className="settingPunkt punkt3"></div>
                </button>
            </div>
            <div className="messagesBlock">
                {sortedMessageList?.map((messageCard) => {
                    return messageCard.isItMyMessage ? (
                        <MyMessageCard
                            cardData={messageCard}
                            key={messageCard.MessageId}
                        />
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
                        onKeyDown={handleKeyDown}
                        value={contentText}
                    ></textarea>{' '}
                    <button className="sendButton" onClick={handleSendMessage}>
                        <img src={sendIcon} alt="send message" />
                    </button>
                </div>
            </div>
            {switchModal === 'ChatParamModal' && resData && (
                <ChatParamModal
                    handleSwitchModal={handleSwitchModal}
                    avatarType="chat"
                    ChatInfo={resData}
                />
            )}
        </div>
    );
}
