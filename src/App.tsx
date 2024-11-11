import { AuthorizationPage } from '@components/authorization/authorizationPage';
import { RegistrationPage } from '@components/registration/registrationPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './styles/index.scss';
import { ErrorPage } from '@components/errorPage/errorPage';
import { atom } from 'jotai';
import { Header } from '@components/header/header';
import { Layout } from '@components/layout/layout';
import { ChatPage } from '@components/chatPage/chatPage';

export const coutAtom = atom('ligth');
export function App() {
    return (
        //<Provider>
        <BrowserRouter>
            <Routes>
                <Route path="authorization" element={<AuthorizationPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="error" element={<ErrorPage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/profile" element={<RegistrationPage />}></Route>
                    <Route path="/chats" element={<ChatPage />}></Route>
                    <Route path="/createChat" element={<p>hello world</p>}></Route>
                    <Route path="/createChanel" element={<p>hello</p>}></Route>

                </Route>
            </Routes>
        </BrowserRouter>
        //</Provider>
    );
}
