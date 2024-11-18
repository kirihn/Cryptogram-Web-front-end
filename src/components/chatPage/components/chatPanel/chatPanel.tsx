import { useAtom } from 'jotai';
import { openStickerPanel } from '@jotai/atoms';
import './chatPanel.scss';
import sendIcon from '@icons/send.svg';
export function ChatPanel() {
    const [OpenStickerPanel, setOpenStickerPanel] = useAtom(openStickerPanel);
    const ShowStickers = async () => {
        setOpenStickerPanel(!OpenStickerPanel);
    };

    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = '45px';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Установить новую высоту
    };

    return (
        <div className="chatPanelContainer">
            <div className="chatPanelHeader">
                <div className="chatNameHeader">
                    <img
                        src="/defaults/userAvatars/defaultUserAvatar.jpg"
                        alt="chatAvatar"
                        className="chatAvatarHeader"
                    />
                    <p>Chat name</p>
                </div>
                <button className="chatSettingsButton">
                    <div className="settingPunkt punkt1"></div>
                    <div className="settingPunkt punkt2"></div>
                    <div className="settingPunkt punkt3"></div>
                </button>
            </div>
            <div className="messagesBlock">
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
                <p>sdada</p> <p> fgdfh fgdh fdgh gfd h</p>
                <p>sdada</p>
                <p>sdada</p>
            </div>
            <div className="inputMessageBlockContainer">
                <div className="inputMessageBlock">
                    <button className="StickerButton" onClick={ShowStickers}>
                        Stickers
                    </button>
                    <textarea
                        className="inputMessage"
                        placeholder="Input message"
                        onInput={handleInput}
                    ></textarea>{' '}
                    <button className="sendButton" onSubmit={alert}>
                        <img src={sendIcon} alt="send message" />
                    </button>
                </div>
            </div>
        </div>
    );
}
