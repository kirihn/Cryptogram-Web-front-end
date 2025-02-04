import { useEffect, useRef, useState } from 'react';
import './addContacts.scss';
import { useAtomValue } from 'jotai';
import { myUserIdAtom } from '@jotai/atoms';
import QRCodeStyling from 'qr-code-styling';
import Logo from '@assets/icons/CRG.svg';
import { Html5Qrcode } from 'html5-qrcode';
import { QRCodeCanvas } from 'qrcode.react';
export function AddContacts() {
    const [isOpenScan, setIsOpenScan] = useState(false);
    const [qrMessage, setQrMessage] = useState('');

    const currentUserId = useAtomValue(myUserIdAtom);

    useEffect(() => {
        const config = { fps: 10, qrbox: { width: 200, height: 200 } };
        const html5QrCode = new Html5Qrcode('qrCodeScanerContainer');

        const qrScanerStop = () => {
            if (html5QrCode && html5QrCode.isScanning) {
                html5QrCode
                    .stop()
                    .then(() => {
                        //
                        console.log('scaner stop');
                    })
                    .catch(() => {
                        console.log('scaner error');
                    }); //
            }
        };

        const qrScanerSuccess = (decodedText: string) => {
            setQrMessage(decodedText);
            setIsOpenScan(false);
            alert(decodedText);
        };

        if (isOpenScan) {
            html5QrCode.start(
                { facingMode: 'environment' },
                config,
                qrScanerSuccess,
                (err) => {},
            );
            setQrMessage('');
        } else {
            qrScanerStop();
        }

        return () => {
            qrScanerStop();
        };
    }, [isOpenScan]);
    return (
        <div className="addContactsContainer">
            <h2 className="h2">Add new contact</h2>
            <div className="content">
                <QRCodeCanvas
                    className="myQr"
                    value={currentUserId}
                    size={200}
                />

                <div id="qrCodeScanerContainer"></div>
                <div className="buttonsContainer">
                    <button
                        className="targetButton button"
                        onClick={() => {
                            setIsOpenScan(!isOpenScan);
                        }}
                    >
                        {isOpenScan ? 'Close scan' : 'Open scan'}
                    </button>

                    <button
                        className="targetButton button"
                        onClick={() => {}}
                        disabled={!qrMessage} // Кнопка будет отключена, если qrMessage пустое
                    >
                        Send request to contact
                    </button>
                </div>
            </div>
        </div>
    );
}
