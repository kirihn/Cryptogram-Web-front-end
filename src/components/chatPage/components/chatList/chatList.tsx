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
} from './types';
import axios from 'axios';
import { useAtom } from 'jotai';
import { currentChatAtom } from '@jotai/atoms';

export function ChatList() {
    const [search, setSeatch] = useState('');
    const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);

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
        await setSeatch(value);
    };

    const handleChangeFixChat = async (chatMemberId: number) => {
        executeFixChat({ chatMemberId });
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
                            ? { ...el, IsFixed: changeFixChatData.status }
                            : el,
                    ) ?? [],
            );
        }
    }, [changeFixChatData]);

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
                        {chatCard.AvatarPath ==
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
                        )}

                        <div className="infoContainer">
                            <div className="nameContainer">
                                <p className="chatName">{chatCard.ChatName}</p>
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
                                <p className="lastMessage">труляля оп ля ля</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
