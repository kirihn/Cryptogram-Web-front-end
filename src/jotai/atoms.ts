import { atomWithStorage } from 'jotai/utils';

export const darkModeAtom = atomWithStorage<boolean>('darkMode', true);
export const ruModeAtom = atomWithStorage<string>('langMode', 'ru');
export const openStickerPanelAtom = atomWithStorage<boolean>('sticketPanel', false);
export const currentChatAtom = atomWithStorage<number>('currentChat', -1); // -1 mean that user don't choice chat else 
export const myUserIdAtom = atomWithStorage<string>('myUserid', '');

