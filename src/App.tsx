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

export const coutAtom = atom('ligth');
export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="authorization" element={<AuthorizationPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="error" element={<ErrorPage />} />
                <Route path="/" element={<Layout />}>
                    <Route
                        path="/profile"
                        element={<RegistrationPage />}
                    ></Route>
                    <Route path="/chats" element={<ChatPage />}></Route>
                    <Route
                        path="/createChat"
                        element={<CreateChat/>}
                    ></Route>
                    <Route path="/createChanel" element={<p>hello</p>}></Route>
                    <Route path="/people" element={<p>люди</p>}></Route>

                </Route>
                <Route
                    path="testChat"
                    element={
                        <div className="heigth">
                            <ChatList />
                        </div>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
