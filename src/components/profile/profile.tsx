import userAvatar from '@assets/images/default/defaultChatAvatar.jpg';
import editIcon2 from '@icons/pencil2.svg';

import './profile.scss';
import { useState } from 'react';
import { EditNameModal } from '@components/editNameModal/editNameModal';
import { EditUserameModal } from '@components/editUsernameModal/editUsernameModal';

export function Profile() {
    const [switchModal, setSwitchModal] = useState<string | null>(null);

    const handleSwitchModal = (modal: string | null) => {
        setSwitchModal(modal);
    };

    return (
        <div className="profilePageContainer">
            <div className="profileContainer">
                <div className="avatarBorder">
                    <img src={userAvatar} alt="" className="userAvatar" />
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
                        <button className="changeParamButton" onClick={() => handleSwitchModal('editNameModal')}>
                            <img src={editIcon2} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">@ Username</p>
                    <div className="optionblock">
                        <p className="optionValue">@ymato</p>
                        <button className="changeParamButton" onClick={() => handleSwitchModal('editUsernameModal')}>
                            <img src={editIcon2} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">Email</p>
                    <div className="optionblock">
                        <p className="optionValue">ymasto@mail.ru</p>
                        {/* <button className="changeParamButton">
                            <img src={editIcon2} alt="Edit" />
                        </button> */}
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
        </div>
    );
}
