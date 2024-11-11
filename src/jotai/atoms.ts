import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const darkModeAtom = atomWithStorage('darkMode', true);
export const ruModeAtom = atomWithStorage('langMode', 'ru');
export const openStickerPanel = atomWithStorage('sticketPanel', false)

// export const themeAtom = atom('dark');