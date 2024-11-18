import { AuthorizationPage } from '@components/authorization/authorizationPage';
import { RegistrationPage } from '@components/registration/registrationPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './styles/index.scss';
import { ErrorPage } from '@components/errorPage/errorPage';
import { atom } from 'jotai';
import { Header } from '@components/header/header';
import { Layout } from '@components/layout/layout';
import { ChatPage } from '@components/chatPage/chatPage';
import { ChatList } from '@components/chatPage/components/chatList/chatList';
import { CreateChat } from '@components/addChat/createChat';
import { Profile } from '@components/profile/profile';

export const coutAtom = atom('ligth');
export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="authorization" element={<AuthorizationPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="error" element={<ErrorPage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/chats" element={<ChatPage />}></Route>
                    <Route path="/createChat" element={<CreateChat />}></Route>
                    <Route
                        path="/createChanel"
                        element={<AuthorizationPage />}
                    ></Route>
                    <Route
                        path="/people"
                        element={<RegistrationPage />}
                    ></Route>
                </Route>
                <Route
                    path="testChat"
                    element={
                        <div className="heigth">
                            <ChatList />
                        </div>
                    }
                />
                <Route
                    path="testProfile"
                    element={
                        <div className="heigth">
                            <Profile />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
