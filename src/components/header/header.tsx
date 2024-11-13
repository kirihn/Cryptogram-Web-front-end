import { Link, Navigate, useNavigate } from 'react-router-dom';
import chatsIcon from '@icons/messages.svg';
import Logo from '@icons/Logo.svg';
import './header.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { ResponseDto } from './types';

export function Header() {

    const navigate = useNavigate();

    const {resData, loading, execute} = useApi<ResponseDto>(async ()=>{
        return await axios.post('/api/auth/logout');
    })

    const handleLogout = async () => {
        await execute();
        alert(resData)
        if(resData?.message === "Logout successfully")
            navigate(`/authorization`);
    }

    return (
        <header className="headerContainer">
            <div className="logoContainer">
                <img className="logoImg" src={Logo} alt="Logo" />
            </div>
            <nav className="navContainer">
                <Link to={'/profile'}>
                    <img src={chatsIcon} alt="чаты" />
                    <span>Профиль</span>
                </Link>

                <Link to={'/chats'}>
                    <img src={chatsIcon} alt="чаты" />
                    <span>Чаты</span>
                </Link>

                <Link to={'/createChat'}>
                    <img src={chatsIcon} alt="чаты" />
                    <span>Создать чат</span>
                </Link>

                <Link to={'/createChanel'}>
                    <img src={chatsIcon} alt="чаты" />
                    <span>Создать канал</span>
                </Link>

                <Link to={'/chats'}>
                    <img src={chatsIcon} alt="чаты" />
                    <span>Настройки</span>
                </Link>

                <Link to={'/people'}>
                    <img src={chatsIcon} alt="чаты" />
                    <span>Людишки</span>
                </Link>
            </nav>
            <div className="BottomContainer">
                <button className='logoutButton' onClick={handleLogout}>Logout</button>
                <img className="logoImg" src={Logo} alt="Logo" />
            </div>
        </header>
    );
}
