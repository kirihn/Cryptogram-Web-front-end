import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { io, Socket } from 'socket.io-client';

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
        const URI = 'http://localhost:10000';
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

const safeLoad = (): Record<string, number> => {
    try {
        const data = localStorage.getItem('keyValueStorage');
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error('Error parsing localStorage data:', e);
        return {};
    }
};

export const keyValueAtom = atomWithStorage<Record<string, number>>(
    'keyValueStorage',
    safeLoad(),
);

export const keyValueActionsAtom = atom(
    (get) => ({
        getCryptoKey: (key: string): number | null =>
            get(keyValueAtom)?.[key] ?? null,
    }),
    (
        get,
        set,
        action: { type: 'add' | 'delete'; key: string; value?: number },
    ) => {
        const prevState = get(keyValueAtom) || {};

        if (action.type === 'add' && typeof action.value === 'number') {
            set(keyValueAtom, {
                ...prevState,
                [action.key]: action.value,
            });
        } else if (action.type === 'delete') {
            const { [action.key]: _, ...newState } = prevState;
            set(keyValueAtom, newState);
        }
    },
);
