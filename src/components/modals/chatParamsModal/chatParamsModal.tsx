import { Props, RequestDto, ResponseDto } from './types';
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
import { EditAvatarModal } from '../editAvatarModal/editAvatarModal';
import { AddMemberModal } from '../addMemberModal/addMemberModal';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
export function ChatParamModal(props: Props) {

    const [switchModal, setSwitchModal] = useState<string | null>(null);

    const currentChatId = useAtomValue(currentChatAtom);

    const { resData, loading, execute } = useApi<ResponseDto, RequestDto>(
        async (data) => {
            return axios.post('api/chat/leaveFromChat', data);
        },
    );

    const handleLeaveFromChat = async () => {
        execute({ chatId: currentChatId });
    };

    const handleSwitchModal = (modal: string | null) => {
        setSwitchModal(modal);
    };

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
                        {props.myRole <= 3 && (
                            <button
                                className="changeChatName"
                                onClick={() =>
                                    handleSwitchModal('EditChatName')
                                }
                            >
                                <img
                                    src={EditIcon}
                                    alt="Change chat name"
                                    className="chengeChatNameIcon"
                                />
                            </button>
                        )}
                        {props.myRole <= 3 && (
                            <button
                                className="changeChatName"
                                onClick={() =>
                                    handleSwitchModal('editAvatarModal')
                                }
                            >
                                <img
                                    src={EditAvatar}
                                    alt="Change chat name"
                                    className="chengeChatNameIcon"
                                />
                            </button>
                        )}
                    </div>
                </div>

                <div className="topicContainer">
                    <h2>
                        {getMembersCountText(props.ChatInfo.ChatMembers.length)}
                    </h2>
                    {props.myRole <= 3 && (
                        <button
                            className="changeParamButton"
                            onClick={() => handleSwitchModal('addMemberModal')}
                        >
                            <img src={AddMemberIcon} alt="add member" />
                        </button>
                    )}
                </div>

                <div className="members">
                    {props.ChatInfo.ChatMembers.map((member) => (
                        <div className="member" key={member.Member.UserId}>
                            <img
                                src={member.Member.AvatarPath}
                                alt="memberAvatar"
                                className="memberAvatar"
                            />
                            <div className="info">
                                <div className="nameAndRole">
                                    <p className="memberName">
                                        {member.Member.Name}
                                    </p>
                                    <p className="memberRole">
                                        {RoleTranslator(member.Role)}
                                    </p>
                                </div>
                                <div className="usernameAndButtons">
                                    <p className="memberUsername">
                                        {' '}
                                        @{member.Member.UserName}
                                    </p>
                                    <div className="buttons">
                                        {props.myRole <= 2 &&
                                            props.myRole < member.Role && (
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
                        onClick={handleLeaveFromChat}
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
                    {switchModal === 'addMemberModal' && (
                        <AddMemberModal
                            handleSwitchModal={handleSwitchModal}
                            myRole={props.myRole}
                            chatId={currentChatId}
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
