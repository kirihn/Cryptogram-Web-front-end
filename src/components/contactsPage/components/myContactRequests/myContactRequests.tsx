import { useEffect, useRef, useState } from 'react';
import './myContactRequests.scss';
import { useApi } from 'hooks/useApi';
import { ResponseDto } from './types';
import axios from 'axios';
import { ContactRequestRecive } from '../contactRequestRecive/contactRequestRecive';
import { ContactRequestSent } from '../contactRequestSent/contactRequestSent';
export function MyContactRequests() {
    const [receivedHeight, setReceivedHeight] = useState(400);
    const [sentHeight, setSentHeight] = useState(400);

    const {
        resData: contactRequestsListData,
        loading,
        execute: executeContactList,
    } = useApi<ResponseDto>(async () => {
        return axios.get('/api/contact/getMyContactRequests');
    });

    const isDraggingRef = useRef(false);
    const lastYRef = useRef(0);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        isDraggingRef.current = true;
        lastYRef.current = event.clientY;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (!isDraggingRef.current) return;

            const deltaY = moveEvent.clientY - lastYRef.current;
            lastYRef.current = moveEvent.clientY;

            const speedFactor = 3; // Ускоряем рост блока

            setReceivedHeight((prevHeight) =>
                Math.max(100, prevHeight + deltaY * speedFactor),
            );
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    useEffect(() => {
        executeContactList();
    }, []);

    return (
        <div className="myContactRequestsContainer">
            <h2 className="h2">Contact requests</h2>

            <div className="topic">
                <p>requests received</p>
            </div>
            <div
                className="ContactRequestsRecive contactRequestBlock"
                style={{ height: `${receivedHeight}px` }}
            >
                {contactRequestsListData?.ReceivedContactRequests.length ? (
                    contactRequestsListData?.ReceivedContactRequests.map(
                        (contactRequest) => (
                            <ContactRequestRecive
                                ContactRequest={contactRequest}
                                key={contactRequest.ContactRequestId}
                            />
                        ),
                    )
                ) : (
                    <p>Список запросов пока пуст</p>
                )}
            </div>

            <div
                className="topic moveTopic"
                onMouseDown={(e) => handleMouseDown(e)}
            >
                <p>requests sent</p>
            </div>
            <div
                className="ContactRequestsSent contactRequestBlock"
                style={{ height: `${sentHeight}px` }}
            >
                {contactRequestsListData?.SentContactRequests.length ? (
                    contactRequestsListData.SentContactRequests.map(
                        (contactRequest) => (
                            <ContactRequestSent
                                ContactRequest={contactRequest}
                                key={contactRequest.ContactRequestId}
                            />
                        ),
                    )
                ) : (
                    <p>Список запросов пока пуст</p>
                )}
            </div>
        </div>
    );
}
