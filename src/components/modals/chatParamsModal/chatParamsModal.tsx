import {
    Props,
    RequestDeleteMemberDto,
    RequestDto,
    ResponseDto,
} from './types';
import AddMemberIcon from '@icons/addMember.svg';
import DeleteMemberIcon from '@icons/deleteMember.svg';
import EditIcon from '@icons/pencil.svg';
import EditAvatar from '@icons/uplodaFile.svg';
import SetKey from '@icons/key.svg';
import './chatParamsModal.scss';
import { getMembersCountText } from '@utils/func/getMembersCountText';
import { useEffect, useState } from 'react';
import { RoleTranslator } from '@utils/func/roleTranslator';
import { useAtom } from 'jotai';
import { currentChatAtom } from '@jotai/atoms';
import { EditAvatarModal } from '../editAvatarModal/editAvatarModal';
import { AddMemberModal } from '../addMemberModal/addMemberModal';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { EditChatNameModal } from '../editChatName/editChatName';
import { EditChatKeyModal } from '../editChatKeyModal/editChatKeyModal';
import { useModal } from 'hooks/useModal';
export function ChatParamModal(props: Props) {
    const { switchModal, handleSwitchModal, handleCloseModal } = useModal();

    const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);

    const {
        resData: leaveFromChatData,
        loading: LeaveFromChatExecuteLoading,
        execute: LeaveFromChatExecute,
    } = useApi<ResponseDto, RequestDto>(async (data) => {
        return axios.post('api/chat/leaveFromChat', data);
    });

    const {
        resData: ExcludeFromChatData,
        loading: ExcludeFromChatExecuteLoading,
        execute: ExcludeFromChatExecute,
    } = useApi<ResponseDto, RequestDeleteMemberDto>(async (data) => {
        return axios.put('api/chat/deleteMember', data);
    });

    const handleDeleteMember = async (userId: string) => {
        ExcludeFromChatExecute({ userId: userId, chatId: currentChatId });
    };

    const handleLeaveFromChat = async () => {
        LeaveFromChatExecute({ chatId: currentChatId });
    };

    useEffect(() => {
        if (!ExcludeFromChatData) return;
        window.location.reload();
    }, [ExcludeFromChatData]);

    useEffect(() => {
        if (!leaveFromChatData) return;
        setCurrentChatId(-1);
        window.location.reload();
    }, [leaveFromChatData]);

    return (
        <div
            className="ChatParamsContainer"
            onClick={() => {
                props.handleCloseModal();
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
                                    handleSwitchModal('editChatNameModal')
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
                                    alt="Change chat avatar"
                                    className="chengeChatNameIcon"
                                />
                            </button>
                        )}
                        <button
                            className="changeChatName"
                            onClick={() =>
                                handleSwitchModal('editChatKeyModal')
                            }
                        >
                            <img
                                src={SetKey}
                                alt="Change chat key"
                                className="chengeChatNameIcon"
                            />
                        </button>
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
                                                        onClick={() =>
                                                            handleDeleteMember(
                                                                member.Member
                                                                    .UserId,
                                                            )
                                                        }
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
                    {switchModal === 'editChatNameModal' && (
                        <EditChatNameModal
                            handleSwitchModal={handleSwitchModal}
                            handleCloseModal={handleCloseModal}
                        />
                    )}
                    {switchModal === 'addMemberModal' && (
                        <AddMemberModal
                            handleSwitchModal={handleSwitchModal}
                            handleCloseModal={handleCloseModal}
                            myRole={props.myRole}
                            chatId={currentChatId}
                        />
                    )}
                    {switchModal === 'editAvatarModal' && (
                        <EditAvatarModal
                            handleSwitchModal={handleSwitchModal}
                            handleCloseModal={handleCloseModal}
                            avatarType="chat"
                            chatId={currentChatId}
                        />
                    )}
                    {switchModal === 'editChatKeyModal' && (
                        <EditChatKeyModal
                            handleSwitchModal={handleSwitchModal}
                            handleCloseModal={handleCloseModal}
                            isChangedChatId={false}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
