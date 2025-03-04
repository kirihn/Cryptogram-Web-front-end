import { ChatPanel } from '@components/chatPage/components/chatPanel/chatPanel';
import { ChatList } from '@components/chatPage/components/chatList/chatList';
import { StickerPanel } from '@components/chatPage/components/stickerPanel/stickerPanel';
import { useAtomValue } from 'jotai';
import { currentChatAtom, openStickerPanelAtom } from '@jotai/atoms';
import './chatPage.scss';
import { useResize } from 'hooks/useResize';

export function ChatPage() {
    const openStickerPanelValue = useAtomValue(openStickerPanelAtom);
    const currentChatId = useAtomValue(currentChatAtom);
    const { screenSize, isSMScreen, isMDScreen, isLGScreen, isXLScreen } =
        useResize();
    return (
        <>
            {(isLGScreen || isXLScreen) && (
                <div className="chatPageContainer">
                    <ChatList />
                    <ChatPanel />
                    {openStickerPanelValue ? <StickerPanel /> : null}
                </div>
            )}
            {isMDScreen && (
                <div className="chatPageContainer">
                    <ChatPanel />
                    {openStickerPanelValue ? <StickerPanel /> : <ChatList />}
                </div>
            )}
            {isSMScreen && (
                <div className="chatPageContainer">
                    {/* <ChatPanel /> <StickerPanel />  <ChatList />} */}
                    {currentChatId == -1 ? (
                        <ChatList />
                    ) : openStickerPanelValue ? (
                        <StickerPanel />
                    ) : (
                        <ChatPanel />
                    )}
                </div>
            )}
        </>
    );
}
