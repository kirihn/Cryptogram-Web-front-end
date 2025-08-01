import { Link, Navigate, useNavigate } from 'react-router-dom';
import chatsIcon from '@icons/chat.png';
import profileIcon from '@icons/profile.png';
import addChat from '@icons/addChat.png';
import contacts from '@icons/contacts.png';

import Logo from '@icons/Logo.svg';
import './header.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { ResponseDto } from './types';
import { useEffect } from 'react';
import { currentChatAtom, myUserIdAtom, wsTokenAtom } from '@jotai/atoms';
import { useSetAtom } from 'jotai';
import { useResize } from 'hooks/useResize';

export function Header() {
    const navigate = useNavigate();
    const setMyUserId = useSetAtom(myUserIdAtom);
    const setCurrentChatId = useSetAtom(currentChatAtom);
    const setWsTokenAtom = useSetAtom(wsTokenAtom);

    const { resData, loading, execute } = useApi<ResponseDto>(async () => {
        return await axios.post('/api/auth/logout');
    });

    const handleLogout = async () => {
        await execute();
    };

    useEffect(() => {
        if (resData?.message === 'Logout successfully') {
            setMyUserId('');
            setWsTokenAtom('');
            setCurrentChatId(-1);
            navigate(`/authorization`);
        }
    }, [resData]);

    return (
        <header className="headerContainer">
            <div className="logoContainer">
                <img className="logoImg" src={Logo} alt="Logo" />
            </div>
            <nav className="navContainer">
                <Link to={'/profile'}>
                    <img src={profileIcon} alt="Профиль" />
                    {<span className="menuItemName">Профиль</span>}
                </Link>

                <Link to={'/contacts'}>
                    <img src={contacts} alt="Контакты" />
                    <span className="menuItemName">Контакты</span>
                </Link>

                <Link to={'/chats'}>
                    <img src={chatsIcon} alt="Чаты" />
                    <span className="menuItemName">Чаты</span>
                </Link>

                <Link to={'/createChat'}>
                    <img src={addChat} alt="Создать чат" />
                    <span className="menuItemName">Создать чат</span>
                </Link>
{/* 
                <Link to={'/test'}>
                    <img src={chatsIcon} alt="Создать чат" />
                    <span className="menuItemName">Test</span>
                </Link> */}
            </nav>
            {/* <div className="BottomContainer">
                <button className="logoutButton" onClick={handleLogout}>
                    Logout
                </button>
            </div> */}
        </header>
    );
}
