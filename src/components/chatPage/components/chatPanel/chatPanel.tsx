import { useAtom, useAtomValue } from 'jotai';
import {
    currentChatAtom,
    keyValueActionsAtom,
    myUserIdAtom,
    openStickerPanelAtom,
    socketAtom,
} from '@jotai/atoms';
import sendIcon from '@icons/send.svg';
import { useEffect, useMemo, useState } from 'react';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import {
    GetChatInfoRequestDto,
    GetChatInfoResponseDto,
    WSNewMessage,
    SendMessageRequesDto,
    WSDeleteMessage,
    WSUpdateMessage,
} from './types';
import { GetMessageList } from './GetMessageList';
import { MyMessageCard } from '../myMessageCard/myMessageCard';
import { UserMessageCard } from '../userMessageCard/userMessageCard';
import { ChatParamModal } from '@components/modals/chatParamsModal/chatParamsModal';
import { getMembersCountText } from '@utils/func/getMembersCountText';
import { Encrypt } from '@utils/func/encrypt';
import { EditChatKeyModal } from '@components/modals/editChatKeyModal/editChatKeyModal';
import * as CryptoJS from 'crypto-js';
import './chatPanel.scss';

export function ChatPanel() {
    const [switchModal, setSwitchModal] = useState<string | null>(null);
    const [myRole, setMyRole] = useState<number>(5);
    const [contentText, setContentText] = useState('');

    const [OpenStickerPanel, setOpenStickerPanel] =
        useAtom(openStickerPanelAtom);
    const currentChatId = useAtomValue(currentChatAtom);
    const socket = useAtomValue(socketAtom);
    const currentUserId = useAtomValue(myUserIdAtom);
    const { getCryptoKey } = useAtomValue(keyValueActionsAtom);

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

        const key = getCryptoKey('KeyForChat' + currentChatId);

        if (!key) {
            alert('add key and try again');
            return;
        }

        const encryptContent = Encrypt(contentText, key);

        sendMessageExecute({
            content: encryptContent,
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
        console.log(JSON.stringify(resData))
        console.log(JSON.stringify(resData))
        console.log(JSON.stringify(resData))

        resData.ChatMembers.forEach((member) => {
            if (member.Member.UserId == currentUserId) {
                console.log("useMemo + myRole + " + member.Role)
                setMyRole(member.Role);
                return;
            }
        });

        return GetMessageList(resData);
    }, [resData]);

    useEffect(() => {
        if (currentChatId == -1) {
            setResData(null);
            return;
        }
        execute({ chatId: currentChatId });
        setSwitchModal(null);
    }, [currentChatId]);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (message: WSNewMessage) => {
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

        const handleDeleteMessage = (deletedMessage: WSDeleteMessage) => {
            if (currentChatId != deletedMessage.chatId) return;

            setResData((prevResData) => {
                if (!prevResData) return null;

                return {
                    ...prevResData,
                    ChatMessages: prevResData.ChatMessages.filter(
                        (message) =>
                            message.MessageId !=
                            deletedMessage.deletedMessageId,
                    ),
                };
            });
        };

        const handleUpdateMessage = (updatedMessage: WSUpdateMessage) => {
            if (currentChatId != updatedMessage.chatId) return;

            setResData((prevResData) => {
                if (!prevResData) return null;

                return {
                    ...prevResData,
                    ChatMessages: prevResData.ChatMessages.map((message) => {
                        if (
                            message.MessageId ===
                            updatedMessage.updatedMessageId
                        ) {
                            return {
                                ...message,
                                Content: updatedMessage.newContent,
                                IsUpdate: true,
                            };
                        }

                        return message;
                    }),
                };
            });
        };

        socket.on('NewMessage', handleMessage);
        socket.on('DeleteMessage', handleDeleteMessage);
        socket.on('UpdateMessage', handleUpdateMessage);

        return () => {
            socket.off('NewMessage');
            socket.off('DeleteMessage');
            socket.off('UpdateMessage');
        };
    }, [socket, currentChatId]);

    useEffect(() => {
        if (!resData) return;
        if (!currentChatId) return;
        if (switchModal != null) return;

        const key = getCryptoKey('KeyForChat' + currentChatId);
        if (!key) {
            handleSwitchModal('SetChatKey');

            return;
        }
        const keyHash = CryptoJS.SHA256(key.toString()).toString(
            CryptoJS.enc.Base64,
        );

        if (keyHash !== resData.KeyHash) handleSwitchModal('SetChatKey');
        console.log('\n');
        console.log('chatname - ' + resData.ChatName);
        console.log('krypto key from ls - ' + key);
        console.log('CurrentChatId Hash - ' + keyHash);
        console.log('resData Hash - ' + resData.KeyHash);
    }, [resData, currentChatId, switchModal]);

    return (
        <div className="chatPanelContainer">
            <div className="chatPanelHeader">
                <div className="chatNameHeader">
                    {resData?.AvatarPath ==
                    '/static/defaults/chatAvatars/defaultChatAvatar.png' ? (
                        <div className="chatAvatarHeader">
                            {resData.ChatName[0].toUpperCase()}
                        </div>
                    ) : (
                        <img
                            src={
                                resData
                                    ? resData.AvatarPath
                                    : '/static/defaults/chatAvatars/errorChatAvatar.png'
                            }
                            alt="chatAvatar"
                            className="chatAvatarHeader"
                        />
                    )}
                    <div className="ChatNameContainer">
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
                {currentChatId == -1 && <p className="noChatId">Choise chat</p>}
                {sortedMessageList?.map((messageCard) => {
                    return messageCard.isItMyMessage ? (
                        <MyMessageCard
                            cardData={messageCard}
                            key={messageCard.MessageId}
                        />
                    ) : (
                        <UserMessageCard
                            cardData={messageCard}
                            key={messageCard.MessageId}
                        />
                    );
                })}
            </div>
            {myRole != 5 && currentChatId != -1 && (
                <div className="inputMessageBlockContainer">
                    <div className="inputMessageBlock">
                        <button
                            className="StickerButton"
                            onClick={ShowStickers}
                        >
                            Stickers
                        </button>
                        <textarea
                            className="inputMessage"
                            placeholder="Input message"
                            onInput={handleInput}
                            onKeyDown={handleKeyDown}
                            value={contentText}
                        ></textarea>{' '}
                        <button
                            className="sendButton"
                            onClick={handleSendMessage}
                            disabled={currentChatId == -1 ? true : false}
                        >
                            <img src={sendIcon} alt="send message" />
                        </button>
                    </div>
                </div>
            )}
            {switchModal === 'ChatParamModal' && resData && (
                <ChatParamModal
                    handleSwitchModal={handleSwitchModal}
                    avatarType="chat"
                    ChatInfo={resData}
                    myRole={myRole}
                />
            )}
            {switchModal === 'SetChatKey' && resData && (
                <EditChatKeyModal handleSwitchModal={handleSwitchModal} />
            )}
        </div>
    );
}
