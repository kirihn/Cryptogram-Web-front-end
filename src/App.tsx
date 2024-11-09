import { AuthorizationPage } from '@components/authorization/authorizationPage';
import { RegistrationPage } from '@components/registration/registrationPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './styles/index.scss';
import { ErrorPage } from '@components/errorPage/errorPage';
import { atom } from 'jotai';

export const coutAtom = atom('ligth');
export function App() {
    return (
        //<Provider>
        <BrowserRouter>
            <Routes>
                <Route path="authorization" element={<AuthorizationPage />} />
                <Route path="registration" element={<RegistrationPage />} />
                <Route path="/error" element={<ErrorPage />} />

            </Routes>
        </BrowserRouter>
        //</Provider>
    );
}
