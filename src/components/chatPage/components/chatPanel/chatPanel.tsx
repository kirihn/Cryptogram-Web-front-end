import { useAtom, useSetAtom } from 'jotai';
import { openStickerPanel } from '@jotai/atoms';
import './chatPanel.scss';
import defaulChatAvatar from '@assets/images/default/defaultChatAvatar.jpg';
import sendIcon from '@icons/send.svg';
export function ChatPanel() {
    const [OpenStickerPanel, setOpenStickerPanel] = useAtom(openStickerPanel);
    const ShowStickers = async () => {
        setOpenStickerPanel(!OpenStickerPanel);
    };

    return (
        <div className="chatPanelContainer">
            <div className="chatPanelHeader">
                <div className="chatNameHeader">
                    <img
                        src={defaulChatAvatar}
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
                    <input className='inputMessage' type="text" placeholder='Input message' />
                    <button className='sendButton' onSubmit={alert}>
                        <img src={sendIcon} alt="send message" />
                    </button>
                </div>
            </div>
        </div>
    );
}
