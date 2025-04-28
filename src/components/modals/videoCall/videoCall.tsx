import { useEffect, useRef, useState } from 'react';
import { Props } from './types';
import { useAtomValue } from 'jotai';
import { myUserIdAtom, socketAtom } from '@jotai/atoms';
import './videoCall.scss';
import { GetMemberFields } from '@utils/func/getMemberFields';

export function VideoCall(props: Props) {

    return (
        <div className="video-call">
            {/* <div className="videos">
                <video ref={localVideoRef} autoPlay muted playsInline />
                <video ref={remoteVideoRef} autoPlay playsInline />
            </div>
            {!isCall && <button onClick={startCall}>Начать звонок</button>} */}
        </div>
    );
}
