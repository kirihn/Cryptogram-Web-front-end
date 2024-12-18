import { Buffer } from 'buffer';

export function Encrypt(msg: string, key: number) {
    let codeMsg = [];
    let encryptCodeMsg = [];
    let encryptMsg = '';

    const codeKey = key.toString(2);
    const codeKeylength = codeKey.length;

    for (let i = 0; i < msg.length; i++) {
        console.log(msg.charCodeAt(i).toString(2));
    }
    for (let i = 0; i < msg.length; i++) {
        console.log(Buffer.from(msg.charAt(i), 'utf8').toString())
    }

    for (let i = 0; i < msg.length; i++) {
        codeMsg.push(msg.charCodeAt(i).toString(2).padStart(14, '0'));
    }

    let index = 0;
    encryptCodeMsg = codeMsg.map((codeMsgEl) => {
        let encryptCodeMsgEl = '';

        for (let i = 0; i < codeMsgEl.length; i++) {
            encryptCodeMsgEl += XoR(codeMsgEl[i], codeKey[index]);
            index++;

            if (index == codeKeylength) index = 0;
        }

        return encryptCodeMsgEl;
    });

    for (let i = 0; i < encryptCodeMsg.length; i++) {
        encryptMsg += String.fromCharCode(parseInt(encryptCodeMsg[i], 2));
    }

    console.log('encrypt - ' + Buffer.from(encryptMsg).toString('base64'));
    //return Buffer.from(encryptMsg).toString('base64');
    return encryptMsg;
}

function XoR(el1: string, el2: string): string {
    return el1 === el2 ? '0' : '1';
}
