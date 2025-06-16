import { Buffer } from 'buffer';

export function Decrypt(msg: string, key: number) {
    let encryptCodeMsg = [];
    let decryptCodeMsg = [];
    let decryptMsg = '';

    const codeKey = key.toString(2);
    const codeKeylength = codeKey.length;

    for (let i = 0; i < msg.length; i++) {
        encryptCodeMsg.push(msg.charCodeAt(i).toString(2).padStart(14, '0'));
    }

    let index = 0;
    decryptCodeMsg = encryptCodeMsg.map((encryptCodeMsgEl) => {
        let decryptCodeMsgEl = '';

        for (let i = 0; i < encryptCodeMsgEl.length; i++) {
            decryptCodeMsgEl += XoR(encryptCodeMsgEl[i], codeKey[index]);
            index++;

            if (index == codeKeylength) index = 0;
        }

        return decryptCodeMsgEl;
    });

    for (let i = 0; i < decryptCodeMsg.length; i++) {
        decryptMsg += String.fromCharCode(parseInt(decryptCodeMsg[i], 2));
    }

    return decryptMsg;
}

function XoR(el1: string, el2: string): string {
    return el1 === el2 ? '0' : '1';
}
