import { Props } from './types';
import AddMemberIcon from '@icons/addMember.svg';
import DeleteMemberIcon from '@icons/deleteMember.svg';
import EditIcon from '@icons/pencil.svg';
import EditAvatar from '@icons/uplodaFile.svg';
import './chatParamsModal.scss';
import { getMembersCountText } from '@utils/func/getMembersCountText';
import { useEffect, useState } from 'react';
import { RoleTranslator } from '@utils/func/roleTranslator';
import { useAtomValue } from 'jotai';
import { currentChatAtom, myUserIdAtom } from '@jotai/atoms';
import { EditUserameModal } from '../editUsernameModal/editUsernameModal';
import { EditPasswordModal } from '../editPasswordModal/editPasswordModal';
import { EditAvatarModal } from '../editAvatarModal/editAvatarModal';
export function ChatParamModal(props: Props) {
    const [myRole, setMyRole] = useState<number>(5);

    const [switchModal, setSwitchModal] = useState<string | null>(null);

    const handleSwitchModal = (modal: string | null) => {
        setSwitchModal(modal);
    };

    const currentUserId = useAtomValue(myUserIdAtom);
    const currentChatId = useAtomValue(currentChatAtom);
    useEffect(() => {
        props.ChatInfo.ChatMembers.forEach((member) => {
            if (member.Member.UserId == currentUserId) setMyRole(member.Role);
        });
    }, []);
    return (
        <div
            className="ChatParamsContainer"
            onClick={() => {
                props.handleSwitchModal(null);
            }}
        >
            <div
                className="ChatParamModal"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="chatAvatar">
                    <img src={props.ChatInfo.AvatarPath} alt="chatAvatar" />
                </div>

                <div className="chatNameContainer">
                    <h2 className="chatName">{props.ChatInfo.ChatName}</h2>
                    <div>
                        <button
                            className="changeChatName"
                            onClick={() => handleSwitchModal('EditChatName')}
                        >
                            <img
                                src={EditIcon}
                                alt="Change chat name"
                                className="chengeChatNameIcon"
                            />
                        </button>
                        <button
                            className="changeChatName"
                            onClick={() => handleSwitchModal('editAvatarModal')}
                        >
                            <img
                                src={EditAvatar}
                                alt="Change chat name"
                                className="chengeChatNameIcon"
                            />
                        </button>
                    </div>
                </div>

                <div className="topicContainer">
                    <h2>
                        {getMembersCountText(props.ChatInfo.ChatMembers.length)}
                    </h2>
                    <button
                        className="changeParamButton"
                        onClick={() => handleSwitchModal('addmember')}
                    >
                        <img src={AddMemberIcon} alt="add member" />
                    </button>
                </div>

                <div className="members">
                    {props.ChatInfo.ChatMembers.map((member) => (
                        <div className="member">
                            <img
                                src={member.Member.AvatarPath}
                                alt="memberAvatar"
                                className="memberAvatar"
                            />
                            <div className="info">
                                <div className="nameAndRole">
                                    <p className="memberName">
                                        {member.Member.Name}asdsd
                                    </p>
                                    <p className="memberRole">
                                        {RoleTranslator(member.Role)}
                                    </p>
                                </div>
                                <div className="usernameAndButtons">
                                    <p className="memberUsername">
                                        {' '}
                                        @asdasdsad{member.Member.UserName}
                                    </p>
                                    <div className="buttons">
                                        {myRole <= 2 &&
                                            myRole < member.Role && (
                                                <button>
                                                    <img
                                                        className="memberButtonImg"
                                                        src={DeleteMemberIcon}
                                                        alt="deleteMember"
                                                    />
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="topicContainer">
                    <button
                        className="leaveFromChat"
                        onClick={() => handleSwitchModal('')}
                    >
                        Leave from chat
                    </button>
                </div>
            </div>
            {switchModal && (
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {switchModal === 'editUsernameModal' && (
                        <EditUserameModal
                            handleSwitchModal={handleSwitchModal}
                        />
                    )}
                    {switchModal === 'editPasswordModal' && (
                        <EditPasswordModal
                            handleSwitchModal={handleSwitchModal}
                        />
                    )}
                    {switchModal === 'editAvatarModal' && (
                        <EditAvatarModal
                            handleSwitchModal={handleSwitchModal}
                            avatarType="chat"
                            chatId={currentChatId}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
