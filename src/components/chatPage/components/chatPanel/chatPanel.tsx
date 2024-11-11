import { useAtom, useSetAtom } from 'jotai';
import './chatPanel.scss'
import { openStickerPanel } from '@jotai/atoms';
export function ChatPanel() {

    const [OpenStickerPanel, setOpenStickerPanel] = useAtom(openStickerPanel)
    const ShowStickers = async () => {
        setOpenStickerPanel(!OpenStickerPanel);
    }
    return (
        <div className="chatPanelContainer">
            <h2>ChatPanel</h2>
            <button onClick={ShowStickers}>show sticker</button>
        </div>
    );
}
