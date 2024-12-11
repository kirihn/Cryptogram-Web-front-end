export function Encrypt(msg: string, key: number) {
    let codeMsg = [];
    let encryptCodeMsg = [];

    const codeKey = key.toString(2);
    const codeKeylength = codeKey.length;

    for (let i = 0; i < msg.length; i++) {
        codeMsg.push(msg.charCodeAt(i).toString(2));
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

    let fakeResult = '';
    for (let i = 0; i < encryptCodeMsg.length; i++) {
        fakeResult += String.fromCharCode(parseInt(encryptCodeMsg[i], 2));
    }

    console.log(codeKey);
    console.log(JSON.stringify(codeMsg));
    console.log(msg);
    console.log(encryptCodeMsg);
    console.log(fakeResult);

    let indexd = 0;
    let decryptCodeMsg = encryptCodeMsg.map((codeMsgEl) => {
        let encryptCodeMsgEl = '';

        for (let i = 0; i < codeMsgEl.length; i++) {
            encryptCodeMsgEl += XoR(codeMsgEl[i], codeKey[indexd]);
            indexd++;

            if (indexd == codeKeylength) indexd = 0;
        }

        return encryptCodeMsgEl;
    });

    let result = '';
    for (let i = 0; i < decryptCodeMsg.length; i++) {
        result += String.fromCharCode(parseInt(decryptCodeMsg[i], 2));
    }

    console.log(decryptCodeMsg);
    console.log(result);
}

function XoR(el1: string, el2: string): string {
    return el1 === el2 ? '0' : '1';
}
