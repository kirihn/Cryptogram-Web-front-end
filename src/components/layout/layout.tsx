import { Header } from '@components/header/header';
import { Outlet } from 'react-router-dom';
import './layout.scss';
export function Layout() {
    return (
        <div className="layoutContainer">
            <Header />
            <main className='mainContainer'>
                <Outlet />
            </main>
        </div>
    );
}
