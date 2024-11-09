import { AuthorizationPage } from '@components/authorization/authorizationPage';
import { RegistrationPage } from '@components/registration/registrationPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './styles/index.scss';
import { ErrorPage } from '@components/errorPage/errorPage';
import { atom } from 'jotai';
import { Header } from '@components/header/header';
import { Layout } from '@components/layout/layout';

export const coutAtom = atom('ligth');
export function App() {
    return (
        //<Provider>
        <BrowserRouter>
            <Routes>
                {/* <Route path="authorization" element={<AuthorizationPage />} />
                <Route path="registration" element={<RegistrationPage />} /> */}
                <Route path="error" element={<ErrorPage />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/authorization" element={<AuthorizationPage />}></Route>
                    <Route path="/registration" element={<RegistrationPage />}></Route>
                    {/* <Route path="/" element={<Layout />}></Route>
                    <Route path="/" element={<Layout />}></Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
        //</Provider>
    );
}
