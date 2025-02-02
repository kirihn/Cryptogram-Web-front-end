import { useEffect, useMemo, useState } from 'react';
import clearIcon from '@icons/clearIcon.svg';
import fixIconOn from '@icons/CanzButtonOn.svg';
import fixIconOff from '@icons/CanzButtonOff.svg';
import './chatList.scss';
import { useApi } from 'hooks/useApi';
import {
    RequestChangeFixChatDto,
    ResponseChangeFixChatDto,
    ResponseDto,
    WSAddMember,
    WSDeleteMember,
} from './types';
import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import { currentChatAtom, myUserIdAtom, socketAtom } from '@jotai/atoms';
import { RoleTranslator } from '@utils/func/roleTranslator';
import { GetMemberFields } from '@utils/func/getMemberFields';

export function ChatList() {
    const [search, setSeatch] = useState('');

    const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);
    const currentUserId = useAtomValue(myUserIdAtom);
    const socket = useAtomValue(socketAtom);

    const {
        resData: chatsListData,
        setResData: setChatsListData,
        loading,
        execute: executeChatsList,
    } = useApi<ResponseDto[]>(async () => {
        return axios.get('/api/chat/getMyChatsList');
    });

    const {
        resData: changeFixChatData,
        loading: loadingFixChat,
        execute: executeFixChat,
    } = useApi<ResponseChangeFixChatDto, RequestChangeFixChatDto>(
        async (data) => {
            return axios.put('/api/chat/fixChat', data);
        },
    );

    const clearSearch = async () => {
        setSeatch('');
    };

    const changeSearch = async (value: string) => {
        setSeatch(value);
    };

    const handleChangeFixChat = async (chatMemberId: number) => {
        executeFixChat({
            chatMemberId,
        });
    };

    const sortedChatsList = useMemo(() => {
        if (search) {
            return chatsListData?.filter((el) =>
                el.ChatName.toLowerCase().includes(search.toLowerCase()),
            );
        }

        if (!chatsListData) return [];

        return [...chatsListData].sort(
            (a, b) => Number(b.IsFixed) - Number(a.IsFixed),
        );
    }, [chatsListData, search]);

    useEffect(() => {
        executeChatsList();
    }, []);

    useEffect(() => {
        if (changeFixChatData?.message === '!Fix chat') {
            setChatsListData(
                (prevChatsList) =>
                    prevChatsList?.map((el) =>
                        el.ChatMemberId === changeFixChatData.chatMemberId
                            ? {
                                  ...el,
                                  IsFixed: changeFixChatData.status,
                              }
                            : el,
                    ) ?? [],
            );
        }
    }, [changeFixChatData]);

    useEffect(() => {
        if (!socket) return;

        const handleAddMember = (message: WSAddMember) => {
            if ((message.message = 'updateChatPanel')) executeChatsList();
        };

        const handleDeletemember = (message: WSDeleteMember) => {
            if (currentChatId === message.deletedChatId) {
                alert('Вас исколючили из данного чата');
                setCurrentChatId(-1);
            }

            if ((message.message = 'updateChatPanel')) executeChatsList();
        };

        socket.on('addUserToChat', handleAddMember);
        socket.on('deleteUserFromChat', handleDeletemember);

        return () => {
            socket.off('addUserToChat');
            socket.off('deleteUserFromChat');
        };
    }, [socket, currentChatId]);

    return (
        <div className="chatListContainer">
            <div className="searchContainer">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Search message"
                    onChange={(event) => changeSearch(event.target.value)}
                    value={search}
                />
                <button className="clearSearch" onClick={clearSearch}>
                    <img src={clearIcon} alt="clearSearch" />
                </button>
            </div>
            <h2 className="h2">Chats</h2>

            <div className="chatsScrolPanel">
                {sortedChatsList?.map((chatCard) => (
                    <div
                        key={chatCard.ChatId}
                        className="chatCard"
                        onClick={() => setCurrentChatId(chatCard.ChatId)}
                    >
                        {chatCard.IsGroup ? (
                            chatCard.AvatarPath ==
                            '/static/defaults/chatAvatars/defaultChatAvatar.png' ? (
                                <div className="chatAvatarContainer">
                                    {chatCard.ChatName[0].toUpperCase()}
                                </div>
                            ) : (
                                <div className="chatAvatarContainer">
                                    <img
                                        className="chatAvatar"
                                        src={chatCard.AvatarPath}
                                        alt="Chat avatar"
                                    />
                                </div>
                            )
                        ) : (
                            <div className="chatAvatarContainer">
                                <img
                                    className="chatAvatar"
                                    src={
                                        GetMemberFields(
                                            currentUserId,
                                            chatCard.ChatMembers,
                                        )?.AvatarPath
                                    }
                                    alt="Chat avatar"
                                />{' '}
                            </div>
                        )}

                        <div className="infoContainer">
                            <div className="nameContainer">
                                <p className="chatName">
                                    {chatCard.IsGroup
                                        ? chatCard.ChatName
                                        : GetMemberFields(
                                              currentUserId,
                                              chatCard.ChatMembers,
                                          )?.Name}
                                </p>
                                <img
                                    src={
                                        chatCard.IsFixed
                                            ? fixIconOn
                                            : fixIconOff
                                    }
                                    alt="fixChat"
                                    onClick={() =>
                                        handleChangeFixChat(
                                            chatCard.ChatMemberId,
                                        )
                                    }
                                />
                            </div>
                            <div className="lastMessageContainer">
                                <p className="lastMessage">
                                    role: {RoleTranslator(chatCard.Role)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
