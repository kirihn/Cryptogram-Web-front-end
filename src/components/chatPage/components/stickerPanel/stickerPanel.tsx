import { useEffect, useState } from 'react';
import './stickerPanel.scss';
import { SendMessageRequestDto, StickerPack } from './types';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import {
    currentChatAtom,
    keyValueActionsAtom,
    myUserIdAtom,
} from '@jotai/atoms';
import { Encrypt } from '@utils/func/encrypt';

export function StickerPanel() {
    const [choisedStickerPackId, setChoisedStickerPack] = useState(0);
    const [currentStickerPack, setCurrentStickerPack] = useState<
        StickerPack | undefined
    >(undefined);

    const currentChatId = useAtomValue(currentChatAtom);
    const currentUserId = useAtomValue(myUserIdAtom);
    const { getCryptoKey } = useAtomValue(keyValueActionsAtom);

    const { resData, execute } = useApi<StickerPack[]>(async () => {
        return axios.get('api/chat/getAllStickers');
    });

    const {
        resData: sendMessageData,
        loading: sendmessageLoading,
        execute: sendMessageExecute,
    } = useApi<any, SendMessageRequestDto>(async (data) => {
        return axios.post('/api/chat/sendMessage', data);
    });

    const handleSendMessage = (text: string) => {
        const key = getCryptoKey(
            'KeyForChat-' + currentChatId + '-user-' + currentUserId,
        );
        if (!key) {
            alert('add key and try again');
            return;
        }

        const encryptContent = Encrypt(text, key);

        sendMessageExecute({
            content: encryptContent,
            messageType: 'sticker',
            chatId: currentChatId,
        });
    };

    useEffect(() => {
        execute();
    }, []);

    useEffect(() => {
        if (resData) setChoisedStickerPack(resData[0].StickerGroupId);
    }, [resData]);

    useEffect(() => {
        setCurrentStickerPack(
            resData?.find(
                (stickerPack) =>
                    stickerPack.StickerGroupId == choisedStickerPackId,
            ),
        );
    }, [choisedStickerPackId]);

    return (
        <div className="stickerPanelContainer">
            <h2 className="HeaderStickerPanel">stickerPanel</h2>
            <div className="stickerPacksBar">
                {resData?.map((stickerPack) => (
                    <div
                        key={stickerPack.StickerGroupId}
                        className="StickrePackEl"
                        onClick={() => {
                            setChoisedStickerPack(stickerPack.StickerGroupId);
                        }}
                    >
                        <img
                            src={stickerPack.Stickers[0].StickerPath}
                            alt="StickerPack"
                            className="stickerPackImg"
                        />
                    </div>
                ))}
            </div>
            <div className="stickerPacksContainer">
                {currentStickerPack && (
                    <div className="StickerPack">
                        <h3 className="stickerPackName">
                            {currentStickerPack.GroupName}
                        </h3>
                        <div className="stickersContainer">
                            {currentStickerPack.Stickers.map((sticker) => (
                                <img
                                    key={sticker.StickerId}
                                    src={sticker.StickerPath}
                                    alt="sticker"
                                    className="stickerImg"
                                    onClick={() => {
                                        handleSendMessage(sticker.StickerPath);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
