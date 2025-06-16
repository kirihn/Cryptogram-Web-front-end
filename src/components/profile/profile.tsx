import userAvatar from '@assets/images/default/defaultChatAvatar.jpg';
import editIcon from '@icons/pencil.svg';

import './profile.scss';
import { useEffect } from 'react';
import { EditNameModal } from '@components/modals/editNameModal/editNameModal';
import { EditUserameModal } from '@components/modals/editUsernameModal/editUsernameModal';
import { EditPasswordModal } from '@components/modals/editPasswordModal/editPasswordModal';
import { EditAvatarModal } from '@components/modals/editAvatarModal/editAvatarModal';
import { useApi } from 'hooks/useApi';
import { ResponseDto } from './types';
import axios from 'axios';
import { useModal } from 'hooks/useModal';
import { EditLanguageModal } from '@components/modals/editLanguage/editLanguageModal';
import { GetLangNameByIso } from '@utils/func/getLangCode';
import { useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { currentChatAtom, myUserIdAtom, wsTokenAtom } from '@jotai/atoms';

export interface ResponseDtoLogout {
    message: string;
}

export function Profile() {
    const { switchModal, handleSwitchModal, handleCloseModal } = useModal();

    const navigate = useNavigate();
    const setMyUserId = useSetAtom(myUserIdAtom);
    const setCurrentChatId = useSetAtom(currentChatAtom);
    const setWsTokenAtom = useSetAtom(wsTokenAtom);

    const { resData, loading, execute } = useApi<ResponseDto>(async () => {
        return axios.get('api/profile/getMyProfile');
    });

    const { resData: logoutResdata, execute: logout } =
        useApi<ResponseDtoLogout>(async () => {
            return await axios.post('/api/auth/logout');
        });

    const handleLogout = async () => {
        await logout();
    };

    useEffect(() => {
        if (logoutResdata?.message === 'Logout successfully') {
            setMyUserId('');
            setWsTokenAtom('');
            setCurrentChatId(-1);
            navigate(`/authorization`);
        }
    }, [logoutResdata]);

    useEffect(() => {
        execute();
    }, []);

    return (
        <div className="profilePageContainer">
            <div className="profileContainer">
                <div className="avatarBorder">
                    <img
                        src={resData?.AvatarPath}
                        alt="userAwatar"
                        onClick={() => handleSwitchModal('editAvatarModal')}
                        className="userAvatar"
                    />
                </div>

                <div className="profileTopic">
                    <p className="topic">User fields</p>
                    <p className="description">
                        базовая информация о вас которая видна всем
                        пользователям
                    </p>
                </div>

                <div className="profileOption">
                    <p className="optionName">Name</p>
                    <div className="optionblock">
                        <p className="optionValue">{resData?.Name}</p>
                        <button
                            className="changeParamButton"
                            onClick={() => handleSwitchModal('editNameModal')}
                        >
                            <img src={editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">@Username</p>
                    <div className="optionblock">
                        <p className="optionValue">@{resData?.UserName}</p>
                        <button
                            className="changeParamButton"
                            onClick={() =>
                                handleSwitchModal('editUsernameModal')
                            }
                        >
                            <img src={editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">Avatar</p>
                    <div className="optionblock">
                        <p className="optionValue">avatar/path</p>
                        <button
                            className="changeParamButton"
                            onClick={() => handleSwitchModal('editAvatarModal')}
                        >
                            <img src={editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">Email</p>
                    <div className="optionblock">
                        <p className="optionValue">{resData?.Email}</p>
                        <div className="changeParamButton"></div>
                    </div>
                </div>

                <div className="profileTopic">
                    <p className="topic">Web app settings</p>
                    <p className="description">
                        ваши персональные настройки которые видны только вам
                    </p>
                </div>
                <div className="profileOption">
                    <p className="optionName">Password</p>
                    <div className="optionblock">
                        <p className="optionValue">********</p>
                        <button
                            className="changeParamButton"
                            onClick={() =>
                                handleSwitchModal('editPasswordModal')
                            }
                        >
                            <img src={editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">Language</p>
                    <div className="optionblock">
                        <p className="optionValue">
                            {GetLangNameByIso(resData?.Language || 'unknown')}
                        </p>
                        <button
                            className="changeParamButton"
                            onClick={() =>
                                handleSwitchModal('editLanguageButton')
                            }
                        >
                            <img src={editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">Account</p>
                    <div className="optionblock">
                        <button className="logoutButton" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {switchModal === 'editNameModal' && (
                <EditNameModal
                    handleSwitchModal={handleSwitchModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
            {switchModal === 'editUsernameModal' && (
                <EditUserameModal
                    handleSwitchModal={handleSwitchModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
            {switchModal === 'editPasswordModal' && (
                <EditPasswordModal
                    handleSwitchModal={handleSwitchModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
            {switchModal === 'editAvatarModal' && (
                <EditAvatarModal
                    handleSwitchModal={handleSwitchModal}
                    handleCloseModal={handleCloseModal}
                    avatarType="profile"
                />
            )}
            {switchModal === 'editLanguageButton' && (
                <EditLanguageModal
                    handleSwitchModal={handleSwitchModal}
                    handleCloseModal={handleCloseModal}
                />
            )}
        </div>
    );
}
