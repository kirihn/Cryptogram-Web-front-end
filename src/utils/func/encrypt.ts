export function Encrypt(msg: string, key: number) {
    let codeMsg = [];
    let encryptCodeMsg = [];
    let encryptMsg = '';

    const codeKey = key.toString(2);
    const codeKeylength = codeKey.length;

    for (let i = 0; i < msg.length; i++) {
        codeMsg.push(msg.charCodeAt(i).toString(2).padStart(16, '0'));
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

    return encryptMsg;
}

function XoR(el1: string, el2: string): string {
    return el1 === el2 ? '0' : '1';
}
