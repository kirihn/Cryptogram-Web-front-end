import { EventHandler, useEffect, useRef, useState } from 'react';
import './addContacts.scss';
import { useAtomValue } from 'jotai';
import { myUserIdAtom } from '@jotai/atoms';
import QRCodeStyling from 'qr-code-styling';
import cameraImg from '@assets/icons/camera.svg';
import { Html5Qrcode } from 'html5-qrcode';
import { QRCodeCanvas } from 'qrcode.react';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { RequestDto, ResponseDto } from './types';
import { Camera } from 'three';
import { isCuid } from 'cuid';

export function AddContacts() {
    const [isOpenScan, setIsOpenScan] = useState(false);
    const [username, setUsername] = useState('');
    const currentUserId = useAtomValue(myUserIdAtom);

    const {
        resData: resDataOnScan,
        loading,
        execute,
    } = useApi<ResponseDto, string>(async (decodedText) => {
        const url = '/api/contact/addContactRequest/' + decodedText;
        return axios.post(url);
    });

    const {
        resData: resDataOnUsername,
        loading: loadingOnUsername,
        execute: executeOnUsername,
    } = useApi<ResponseDto, RequestDto>(async (data) => {
        return axios.post('/api/contact/addContactRequestByUsername/', data);
    });

    const sendScanRequest = (decodedText: string) => {
        execute(decodedText);
    };

    const sendUsernameRequest = () => {
        executeOnUsername({ username });
    };

    useEffect(() => {
        const config = { fps: 10 };
        const html5QrCode = new Html5Qrcode('qrCodeScanerContainer');

        const qrScanerStop = () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode
                    .stop()
                    .then(() => {
                        console.log('scaner stop');
                    })
                    .catch(() => {
                        console.log('scaner error');
                    });
            }
        };

        const qrScanerSuccess = (decodedText: string) => {
            setIsOpenScan(false);

            if (isCuid(decodedText)) {
                sendScanRequest(decodedText);
            } else {
                alert('Данный qr код не является пригласительным в контакты ');
            }
        };

        if (isOpenScan) {
            html5QrCode.start(
                { facingMode: 'environment' },
                config,
                qrScanerSuccess,
                (err) => {},
            );
        } else {
            qrScanerStop();
        }

        return () => {
            qrScanerStop();
        };
    }, [isOpenScan]);

    // useEffect(() => {
    //     if (resDataOnScan?.message == 'successful') window.location.reload();
    //     if (resDataOnUsername?.message == 'successful')
    //         window.location.reload();
    // }, [resDataOnScan, resDataOnUsername]);


    return (
        <div className="addContactsContainer">
            <h2 className="h2">Добавить новый контакт</h2>
            <div className="middle">
                <div className="content">
                    <QRCodeCanvas
                        className="myQr"
                        value={currentUserId}
                        size={200}
                    />

                    <div className="scanContainer">
                        <div id="qrCodeScanerContainer">
                            <img
                                src={cameraImg}
                                alt="Camera img"
                                className="scanImg"
                            />
                        </div>
                    </div>
                    <div className="buttonsContainer">
                        <button
                            className="targetButton button"
                            onClick={() => {
                                setIsOpenScan(!isOpenScan);
                            }}
                        >
                            {isOpenScan ? 'Close scan' : 'Open scan'}
                        </button>
                        <input
                            type="text"
                            className="inputForAddContactRequest"
                            placeholder="@Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button
                            className="targetButton button"
                            onClick={sendUsernameRequest}
                            disabled={!username}
                        >
                            Отправить запрос
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
