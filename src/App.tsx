import { AuthorizationPage } from '@components/authorization/authorizationPage';
import { RegistrationPage } from '@components/registration/registrationPage';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './styles/index.scss'
export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="authorization" element={<AuthorizationPage />} />
                <Route path="registration" element={<RegistrationPage />} />
            </Routes>
        </BrowserRouter>
    );
}
