import { useState } from 'react';
import clearIcon from '@icons/clearIcon.svg';
import fixIconOn from '@icons/CanzButtonOn.svg';
import fixIconOff from '@icons/CanzButtonOff.svg';

import './chatList.scss';
export function ChatList() {
    const [search, setSeatch] = useState('');
    const clearSearch = async () => {
        setSeatch('');
    };
    const changeSearch = async (value: string) => {
        await setSeatch(value);
        console.log(search);
    };
    const changeFixChat = async () => {
        alert(1);
    };

    return (
        <div className="chatListContainer">
            <div className="searchContainer">
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Search message"
                    onChange={(event) => changeSearch(event.target.value)}
                    value={search}
                />
                <button className="clearSearch" onClick={clearSearch}>
                    <img src={clearIcon} alt="clearSearch" />
                </button>
            </div>
            <h2 className="h2">Chats</h2>
            <div className="chatsScrolPanel">
                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                            джага джага джага джага джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                оп ля труляля
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                димус жирный пинус
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>

                <div className="chatCard">
                    <div className="chatAvatarContainer">C</div>
                    <div className="infoContainer">
                        <div className="nameContainer">
                            <p className="chatName">chat name</p>
                            <img
                                src={fixIconOn}
                                alt="fixChat"
                                onClick={changeFixChat}
                            />
                        </div>
                        <div className="lastMessageContainer">
                            <p className="lastMessage">
                                алексей бабагей бабагей джага джага
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
