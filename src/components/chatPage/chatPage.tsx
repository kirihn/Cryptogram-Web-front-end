import { ChatPanel } from '@components/chatPage/components/chatPanel/chatPanel';
import { ChatList } from '@components/chatPage/components/chatList/chatList';
import { StickerPanel } from '@components/chatPage/components/stickerPanel/stickerPanel';
import { useAtomValue } from 'jotai';
import { openStickerPanelAtom } from '@jotai/atoms';
import './chatPage.scss';

export function ChatPage() {
    const openStickerPanelValue = useAtomValue(openStickerPanelAtom);
    return (
        <div className="chatPageContainer">
            <ChatList />
            <ChatPanel />
            {openStickerPanelValue ? <StickerPanel /> : null}
        </div>
    );
}
