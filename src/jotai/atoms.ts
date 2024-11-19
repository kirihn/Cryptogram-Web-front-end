import { atomWithStorage } from 'jotai/utils';

export const darkModeAtom = atomWithStorage('darkMode', true);
export const ruModeAtom = atomWithStorage('langMode', 'ru');
export const openStickerPanelAtom = atomWithStorage('sticketPanel', false);
export const currentChatAtom = atomWithStorage<number>('currentChat', 0);

