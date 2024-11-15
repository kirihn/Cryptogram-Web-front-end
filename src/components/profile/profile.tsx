import userAvatar from '@assets/images/default/defaultChatAvatar.jpg';
import editIcon from '@icons/pencil.svg';
import editIcon2 from '@icons/pencil2.svg';

import './profile.scss';

export function Profile() {
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
                        <button className="changeParamButton">
                            <img src={editIcon2} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">@ Username</p>
                    <div className="optionblock">
                        <p className="optionValue">@ymato</p>
                        <button className="changeParamButton">
                            <img src={editIcon2} alt="Edit" />
                        </button>
                    </div>
                </div>
                <div className="profileOption">
                    <p className="optionName">Email</p>
                    <div className="optionblock">
                        <p className="optionValue">
                            ymasto@mail.ru
                        </p>
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
        </div>
    );
}
