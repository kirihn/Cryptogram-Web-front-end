import { useEffect } from 'react';
import './myContactRequests.scss';
import { useApi } from 'hooks/useApi';
import { ResponseDto } from './types';
import axios from 'axios';
import { ContactRequestRecive } from '../contactRequestRecive/contactRequestRecive';
import { ContactRequestSent } from '../contactRequestSent/contactRequestSent';
export function MyContactRequests() {
    const {
        resData: contactRequestsListData,
        loading,
        execute: executeContactList,
    } = useApi<ResponseDto>(async () => {
        return axios.get('/api/contact/getMyContactRequests');
    });

    useEffect(() => {
        executeContactList();
    }, []);

    return (
        <div className="myContactRequestsContainer">
            <h2 className="h2">Contact requests</h2>

            <div className="topic">
                <p>requests received</p>
            </div>
            <div className="ContactRequestsRecive">
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

            <div className="topic">
                <p>requests sent</p>
            </div>
            <div className="ContactRequestsSent">
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
