import { useAtom, useAtomValue } from 'jotai';
import {
    currentChatAtom,
    keyValueActionsAtom,
    myUserIdAtom,
    openStickerPanelAtom,
    socketAtom,
} from '@jotai/atoms';
import sendIcon from '@icons/send.svg';
import { useEffect, useMemo, useRef, useState } from 'react';
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
import styled from 'styled-components';
import { useModal } from 'hooks/useModal';
import { SearchLoader } from '@components/loader/searchLoader';
import { GetMemberFields } from '@utils/func/getMemberFields';
import backIcon from '@icons/backIcon.svg';
import { useResize } from 'hooks/useResize';

export function ChatPanel() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const messagesBlockRef = useRef<HTMLDivElement | null>(null);

    const { switchModal, handleSwitchModal, handleCloseModal } = useModal();

    const [myRole, setMyRole] = useState<number>(6);
    const [contentText, setContentText] = useState('');
    const [isDrag, setIsDrag] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

    const [OpenStickerPanel, setOpenStickerPanel] =
        useAtom(openStickerPanelAtom);
    const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);
    const socket = useAtomValue(socketAtom);
    const currentUserId = useAtomValue(myUserIdAtom);
    const { getCryptoKey } = useAtomValue(keyValueActionsAtom);

    const { screenSize, isSMScreen, isMDScreen, isLGScreen, isXLScreen } =
        useResize();

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

    const {
        resData: sendFileResData,
        loading: loadingFile,
        execute: executeSendFile,
    } = useApi<any, FormData>(async (data) => {
        return axios.post('api/chat/uploadChatFile', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
            params: { chatId: currentChatId },
        });
    });

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.types.includes('Files')) {
            setIsDrag(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDrag(false);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setDroppedFiles(files);
        setIsDrag(false);
    };

    const sendFiles = async () => {
        if (droppedFiles.length > 0) {
            let formData = new FormData();
            const fileToSend = droppedFiles[0];
            formData.append('file', fileToSend);

            await executeSendFile(formData);

            setDroppedFiles((prevState) => prevState.slice(1));
        }
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

        const key = getCryptoKey(
            'KeyForChat-' + currentChatId + '-user-' + currentUserId,
        );
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
        const textarea = document.getElementById('textarea');
        if (textarea) textarea.style.height = '45px';
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
        if (!resData) return;

        resData.ChatMembers.forEach((member) => {
            if (member.Member.UserId == currentUserId) {
                setMyRole(member.Role);
                return;
            }
        });

        return GetMessageList(resData);
    }, [resData]);

    const isUserAtBottom = () => {
        if (messagesBlockRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
                messagesBlockRef.current;
            return scrollHeight - (scrollTop + clientHeight) <= 700;
        }
        return false;
    };

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (currentChatId == -1) {
            setResData(null);
            return;
        }
        execute({ chatId: currentChatId });
        handleCloseModal();
    }, [currentChatId]);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (message: WSNewMessage) => {
            if (currentChatId != message.chatId) return;

            setResData((prevResData) => {
                if (!prevResData) return null;
                if (message.message.SenderId == currentUserId)
                    requestAnimationFrame(scrollToBottom);

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
        if (myRole == 5) setOpenStickerPanel(false);
    }, [myRole]);

    useEffect(() => {
        if (!resData) return;
        if (!currentChatId) return;
        if (switchModal != null) return;
        if (resData.ChatId != currentChatId) return;
        if (!resData.IsGroup) return;
        const key = getCryptoKey(
            'KeyForChat-' + currentChatId + '-user-' + currentUserId,
        );

        if (!key) {
            handleSwitchModal('SetChatKey');

            return;
        }
        const keyHash = CryptoJS.SHA256(key.toString()).toString(
            CryptoJS.enc.Base64,
        );

        if (keyHash !== resData.KeyHash) handleSwitchModal('SetChatKey');
    }, [resData, switchModal]);

    useEffect(() => {
        if (isUserAtBottom()) {
            requestAnimationFrame(scrollToBottom);
        }
    }, [sortedMessageList]);

    useEffect(() => {
        if (loading) return;
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 10);
    }, [loading]);

    const stableDroppedFiles = useMemo(() => droppedFiles, [droppedFiles]);

    useEffect(() => {
        if (droppedFiles.length < 1) return;
        console.log('sendFile');
        sendFiles();
    }, [droppedFiles]);

    return (
        <div className="chatPanelContainer">
            <div className="chatPanelHeader">
                <div className="chatNameHeader">
                    {isSMScreen && (
                        <button
                            className="changeParamButton"
                            onClick={() => setCurrentChatId(-1)}
                        >
                            <img src={backIcon} alt="Edit" />
                        </button>
                    )}
                    {resData?.IsGroup === false ? (
                        <img
                            src={
                                GetMemberFields(
                                    currentUserId,
                                    resData?.ChatMembers,
                                )?.AvatarPath
                            }
                            alt="chatAvatar"
                            className="chatAvatarHeader"
                        />
                    ) : resData?.AvatarPath ==
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
                            {resData?.IsGroup
                                ? resData.ChatName
                                : GetMemberFields(
                                      currentUserId,
                                      resData?.ChatMembers,
                                  )?.Name}
                        </p>
                        {resData?.IsGroup && (
                            <p className="membersCount">
                                {resData &&
                                    getMembersCountText(
                                        resData.ChatMembers.length,
                                    )}
                            </p>
                        )}
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

            {isDrag ? (
                <div
                    className="dragZone"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDragDrop}
                >
                    Перетащите файлы для их отправки
                </div>
            ) : (
                <div
                    className="messagesBlock"
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    ref={messagesBlockRef}
                >
                    {currentChatId == -1 && (
                        <p className="noChatId">Choice chat</p>
                    )}
                    {loading && (
                        <div className="loading">
                            <SearchLoader />
                        </div>
                    )}
                    {loading != true &&
                        sortedMessageList?.map((messageCard) => {
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
                    <div ref={scrollRef}></div>
                </div>
            )}

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
                            id="textarea"
                            placeholder="Input message"
                            onInput={handleInput}
                            onKeyDown={handleKeyDown}
                            value={contentText}
                            maxLength={499}
                        ></textarea>
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
                    handleCloseModal={handleCloseModal}
                    avatarType="chat"
                    ChatInfo={resData}
                    myRole={myRole}
                />
            )}
            {switchModal === 'SetChatKey' && resData && (
                <EditChatKeyModal
                    handleSwitchModal={handleSwitchModal}
                    handleCloseModal={handleCloseModal}
                    isChangedChatId={true}
                />
            )}
        </div>
    );
}
