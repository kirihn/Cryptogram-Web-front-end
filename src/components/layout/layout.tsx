import { Header } from '@components/header/header';
import { Outlet } from 'react-router-dom';
import './layout.scss';
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { createSocketAtom } from '@jotai/atoms';
import { useTestAuth } from 'hooks/useTestAuth';
export function Layout() {

    useTestAuth();

    const initializeSocket = useSetAtom(createSocketAtom);

    useEffect(() => {
        initializeSocket();
    }, [initializeSocket]);

    return (
        <div className="layoutContainer">
            <Header />
            <main className="mainContainer">
                <Outlet />
            </main>
        </div>
    );
}
