import { useEffect, useMemo, useState } from 'react';
import clearIcon from '@icons/clearIcon.svg';
import fixIconOn from '@icons/CanzButtonOn.svg';
import fixIconOff from '@icons/CanzButtonOff.svg';
import './chatList.scss';
import { useApi } from 'hooks/useApi';
import * as CryptoJS from 'crypto-js';
import {
  RequestChangeFixChatDto,
  ResponseChangeFixChatDto,
  ResponseDto,
  WSAddMember,
  WSDeleteMember,
  WSNewMessage,
} from './types';
import axios from 'axios';
import { useAtom, useAtomValue } from 'jotai';
import {
  currentChatAtom,
  keyValueActionsAtom,
  myUserIdAtom,
  socketAtom,
} from '@jotai/atoms';
import { RoleTranslator } from '@utils/func/roleTranslator';
import { GetMemberFields } from '@utils/func/getMemberFields';
import { Decrypt } from '@utils/func/decrypt';
import { Sticker } from '../stickerPanel/types';

export function ChatList() {
  const [search, setSeatch] = useState('');

  const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);
  const currentUserId = useAtomValue(myUserIdAtom);
  const socket = useAtomValue(socketAtom);
  const { getCryptoKey } = useAtomValue(keyValueActionsAtom);

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
      return chatsListData?.filter((el) => {
        if (el.IsGroup)
          return el.ChatName.toLowerCase().includes(search.toLowerCase());

        const memberName = GetMemberFields(currentUserId, el.ChatMembers)?.Name;

        return memberName?.toLowerCase().includes(search.toLowerCase());
      });
    }

    if (!chatsListData) return [];

    return [...chatsListData].sort(
      (a, b) => Number(b.IsFixed) - Number(a.IsFixed),
    );
  }, [chatsListData, search]);

  const GetKeyFromChat = (chatId: number) => {
    const key = getCryptoKey('KeyForChat-' + chatId + '-user-' + currentUserId);
    if (!key) return 0;

    return key;
  };

  const GetLatestMessage = (chatCard: ResponseDto) => {
    if(!chatCard.ChatMessages?.[0]) return '';
    if (!chatCard.ChatMessages[0].Content) return '';
    if (!chatCard.ChatMessages[0].MessageType) return '';

    let key = GetKeyFromChat(chatCard.ChatId);
    if (key == 0) return '';

    const keyHash = CryptoJS.SHA256(key.toString()).toString(
      CryptoJS.enc.Base64,
    );

    if (keyHash !== chatCard.KeyHash && chatCard.IsGroup) return '';
    if (
      ['image', 'video', 'audio', 'file', 'Sticker', 'sticker'].includes(
        chatCard.ChatMessages[0].MessageType,
      )
    )
      return ' *' + chatCard.ChatMessages[0].MessageType + '* ';

    let Content = Decrypt(chatCard.ChatMessages[0].Content, key);

    if (Content.length > 15) {
      return Content.slice(0, 15) + '...';
    } else {
      return Content;
    }
  };

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
      if ((message.message === 'updateChatPanel')) executeChatsList();
    };

    const handleDeletemember = (message: WSDeleteMember) => {
      if (currentChatId === message.deletedChatId) {
        alert('Вас исколючили из данного чата');
        setCurrentChatId(-1);
      }

      if ((message.message = 'updateChatPanel')) executeChatsList();
    };

    const handleMessage = (wsMessage: WSNewMessage) => {
      const updatedChatListData = chatsListData?.map((chat) => {
        if (chat.ChatId === wsMessage.chatId) {
          return {
            ...chat,
            ChatMessages: chat.ChatMessages.map((message) => {
              return {
                ...message,
                Content: wsMessage.message.Content,
                MessageType: wsMessage.message.MessageType,
              };
            }),
          };
        }
        return chat;
      });
      if (updatedChatListData) setChatsListData(updatedChatListData);
    };

    socket.on('addUserToChat', handleAddMember);
    socket.on('deleteUserFromChat', handleDeletemember);
    socket.on('NewMessageForChatList', handleMessage);

    return () => {
      socket.off('addUserToChat');
      socket.off('deleteUserFromChat');
      socket.off('NewMessageForChatList');
    };
  }, [socket, currentChatId]);

  return (
    <div className="chatListContainer">
      <div className="searchContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="Search chat"
          onChange={(event) => changeSearch(event.target.value)}
          value={search}
        />
        <button className="clearSearch" onClick={clearSearch}>
          <img src={clearIcon} alt="clearSearch" />
        </button>
      </div>
      <h2 className="h2">Чаты</h2>

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
                    GetMemberFields(currentUserId, chatCard.ChatMembers)
                      ?.AvatarPath
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
                    : GetMemberFields(currentUserId, chatCard.ChatMembers)
                        ?.Name}
                </p>
                <img
                  src={chatCard.IsFixed ? fixIconOn : fixIconOff}
                  alt="fixChat"
                  onClick={() => handleChangeFixChat(chatCard.ChatMemberId)}
                />
              </div>
              <div className="lastMessageContainer">
                <p className="lastMessage">
                  {/* role: {RoleTranslator(chatCard.Role)} */}
                  {GetLatestMessage(chatCard)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
