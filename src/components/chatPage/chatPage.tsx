import { ChatPanel } from '@components/chatPage/components/chatPanel/chatPanel';
import { ChatList } from '@components/chatPage/components/chatList/chatList';
import './chatPage.scss';
import { StickerPanel } from '@components/chatPage/components/stickerPanel/stickerPanel';
import { useAtomValue } from 'jotai';
import { openStickerPanel } from '@jotai/atoms';
export function ChatPage() {
    const openStickerPanelValue = useAtomValue(openStickerPanel)
    return (
        <div className="chatPageContainer">
            <ChatList />
            <ChatPanel />
            {openStickerPanelValue ? <StickerPanel /> : ""}
        </div>
    );
}
