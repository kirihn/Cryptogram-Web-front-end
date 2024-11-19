import { MessageCard, ResponseDto } from './types';

export function GetMessageList(resData: ResponseDto): MessageCard[] {
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

    return resData.ChatMessages.map((message) => {
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
        };
    });
}
