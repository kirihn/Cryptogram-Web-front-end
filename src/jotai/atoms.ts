import { atomWithStorage } from 'jotai/utils';
import { atom, useAtomValue } from 'jotai';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

export const darkModeAtom = atomWithStorage<boolean>('darkMode', true);
export const ruModeAtom = atomWithStorage<string>('langMode', 'ru');
export const wsTokenAtom = atomWithStorage<string>('wsTokenAtom', '');

export const openStickerPanelAtom = atomWithStorage<boolean>(
    'sticketPanel',
    false,
);
export const currentChatAtom = atomWithStorage<number>('currentChat', -1); // -1 mean that user don't choice chat else
export const myUserIdAtom = atomWithStorage<string>('myUserid', '');

export const socketAtom = atom<Socket | null>(null);

export const createSocketAtom = atom(
    (get) => get(socketAtom),
    (_, set) => {
        //const URI = window.location.origin;
        const URI = 'http://localhost:3000';
        const token = localStorage.getItem('wsTokenAtom');
        const socket = io(URI, {
            query: {
                token: token?.slice(1, token.length - 1),
            },
        });
        set(socketAtom, socket);

        socket.on('connect', () => {
            console.log('Connected to WebSocket');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
        });
    },
);
