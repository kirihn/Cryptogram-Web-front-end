import { ChatMember } from '@components/chatPage/components/chatPanel/types';

export function GetMemberFields(
    myUserId: string,
    members: ChatMember[] | undefined,
) {
    return members?.find((member) => member.Member.UserId !== myUserId)?.Member;
}
