import userAvatar from '@assets/images/default/defaultChatAvatar.jpg';
import editIcon from '@icons/pencil.svg';

import './profile.scss';
import { useState } from 'react';
import { EditNameModal } from '@components/modals/editNameModal/editNameModal';
import { EditUserameModal } from '@components/modals/editUsernameModal/editUsernameModal';
import { EditPasswordModal } from '@components/modals/editPasswordModal/editPasswordModal';
import { EditAvatarModal } from '@components/modals/editAvatarModal/editAvatarModal';

export function Profile() {
    const [switchModal, setSwitchModal] = useState<string | null>(null);

    const handleSwitchModal = (modal: string | null) => {
        setSwitchModal(modal);
    };

    return (
        <div className="profilePageContainer">
            <div className="profileContainer">
                <div className="avatarBorder">
                    <img src="static/uploads/UserAvatars/User-cm1ywsb8n0000j7ar7wbo6axv.gif" alt="" className="userAvatar" />
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
                        <p className="optionValue">Кирюша</p>
                        <button
                            className="changeParamButton"
                            onClick={() => handleSwitchModal('editNameModal')}
                        >
                            <img src={editIcon} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">@ Username</p>
                    <div className="optionblock">
                        <p className="optionValue">@ymato</p>
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
                        <p className="optionValue">ymasto@mail.ru</p>
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
                        <p className="optionValue">Russian</p>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">Theme</p>
                    <div className="optionblock">
                        <p className="optionValue">Dark</p>
                    </div>
                </div>
            </div>

            {switchModal === 'editNameModal' && (
                <EditNameModal handleSwitchModal={handleSwitchModal} />
            )}
            {switchModal === 'editUsernameModal' && (
                <EditUserameModal handleSwitchModal={handleSwitchModal} />
            )}
            {switchModal === 'editPasswordModal' && (
                <EditPasswordModal handleSwitchModal={handleSwitchModal} />
            )}
            {switchModal === 'editAvatarModal' && (
                <EditAvatarModal handleSwitchModal={handleSwitchModal} avatarType='profile'/>
            )}
        </div>
    );
}
