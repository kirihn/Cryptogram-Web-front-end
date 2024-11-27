import { useAtom } from 'jotai';
import { MessageCardDto, GetChatInfoResponseDto } from './types';
import dayjs from 'dayjs';

export function GetMessageList(
    resData: GetChatInfoResponseDto,
): MessageCardDto[] {
    let myUserId = localStorage.getItem('myUserid');
    if (myUserId != null) myUserId = myUserId?.slice(1, myUserId.length - 1);

    if (!resData) return [];

    const membersMap = new Map(
        resData.ChatMembers.map((member) => [
            member.Member.UserId,
            {
                SenderAvatarPath: member.Member.AvatarPath,
                SenderName: member.Member.Name,
            },
        ]),
    );

    let nextSenderId = ''; // Для определения последнего сообщения

    const messageCards: MessageCardDto[] = resData.ChatMessages.map(
        (message) => {
            const sender = membersMap.get(message.SenderId) || {
                SenderAvatarPath:
                    '/static/defaults/userAvatars/errorUserAvatar.png',
                SenderName: 'Unknown',
            };

            return {
                MessageId: message.MessageId,
                Content: message.Content,
                MessageType: message.MessageType,
                IsUpdate: message.IsUpdate,
                IsRead: message.IsRead,
                CreatedAt: message.CreatedAt,
                SenderId: message.SenderId,
                SenderAvatarPath: sender.SenderAvatarPath,
                SenderName: sender.SenderName,
                isItMyMessage: message.SenderId === myUserId,
                isItFirstMessage: false,
                isItLastMessage: false,
            };
        },
    ).sort((a, b) => {
        return a.MessageId - b.MessageId > 0 ? 1 : -1;
    });

    for (let i = messageCards.length - 1; i >= 0; i--) {
        const currentMessage = messageCards[i];
        currentMessage.isItLastMessage =
            currentMessage.SenderId !== nextSenderId;

        nextSenderId = currentMessage.SenderId;
    }

    let previosSenderId = '';
    for (let i = 0; i < messageCards.length; i++) {
        if (messageCards[i].SenderId != previosSenderId)
            messageCards[i].isItFirstMessage = true;

        previosSenderId = messageCards[i].SenderId;
    }

    return messageCards;
}
