import { AuthorizationPage } from '@components/authorization/authorizationPage';
import { RegistrationPage } from '@components/registration/registrationPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './styles/index.scss';
import { ErrorPage } from '@components/errorPage/errorPage';
import { atom, useSetAtom } from 'jotai';
import { Header } from '@components/header/header';
import { Layout } from '@components/layout/layout';
import { ChatPage } from '@components/chatPage/chatPage';
import { ChatList } from '@components/chatPage/components/chatList/chatList';
import { CreateChat } from '@components/createChat/createChat';
import { Profile } from '@components/profile/profile';
import { ChatPanel } from '@components/chatPage/components/chatPanel/chatPanel';
import { useEffect } from 'react';
import { createSocketAtom } from '@jotai/atoms';
import { ChatParamModal } from '@components/modals/chatParamsModal/chatParamsModal';
import { ContactsPage } from '@components/contactsPage/contactsPage';

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
                    <Route path="/contacts" element={<ContactsPage />}></Route>
                    <Route path="/chats" element={<ChatPage />}></Route>
                    <Route path="/createChat" element={<CreateChat />}></Route>
                    <Route
                        path="/people"
                        element={<RegistrationPage />}
                    ></Route>
                </Route>
                {/* <Route
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
                <Route
                    path="testChatpanel"
                    element={
                        <div className="heigth">
                            <ChatPanel />
                        </div>
                    }
                /> */}
            </Routes>
        </BrowserRouter>
    );
}
