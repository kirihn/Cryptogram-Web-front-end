import { useAtom, useSetAtom } from 'jotai';
import { openStickerPanel } from '@jotai/atoms';
import './chatPanel.scss';

export function ChatPanel() {
    const [OpenStickerPanel, setOpenStickerPanel] = useAtom(openStickerPanel);
    const ShowStickers = async () => {
        setOpenStickerPanel(!OpenStickerPanel);
    };

    return (
        <div className="chatPanelContainer">
            <h2>ChatPanel</h2>
            <button onClick={ShowStickers}>show sticker</button>
        </div>
    );
}
