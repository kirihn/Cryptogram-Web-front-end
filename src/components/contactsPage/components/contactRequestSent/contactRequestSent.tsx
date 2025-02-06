import { useApi } from 'hooks/useApi';
import './contactRequestSent.scss';
import {
    DeleteContactRequestDto,
    Props,
    ResponseDeleteContactRequestDto,
} from './types';
import axios from 'axios';
import { useEffect } from 'react';

export function ContactRequestSent(props: Props) {
    const contactRequest = props.ContactRequest;

    const copyUserName = () => {
        navigator.clipboard.writeText(contactRequest.UserRecipient.UserName);
    };

    const { resData, loading, execute } = useApi<
        ResponseDeleteContactRequestDto,
        DeleteContactRequestDto
    >(async (data) => {
        return axios.put('/api/contact/deleteContactRequest', data);
    });

    const deleteContactRequest = () => {
        execute({ ContactRequestId: contactRequest.ContactRequestId });
    };

    return (
        <div className="contactRequestContainerSent">
            <div className="userInfo">
                <div className="AvatarContainer">
                    <img
                        src={contactRequest.UserRecipient.AvatarPath}
                        alt="user sender avatar"
                    />
                </div>
                <div className="contactInfoContainer">
                    <p className="name">{contactRequest.UserRecipient.Name} </p>
                    <p className="lowText" onClick={copyUserName}>
                        @{contactRequest.UserRecipient.UserName}
                    </p>
                </div>
            </div>
            <div className="buttonsContainer">
                <p className="status">status: {contactRequest.Status}</p>
                <button
                    className="contactButtonRevoke neonBox contactButton"
                    onClick={deleteContactRequest}
                >
                    revoke
                </button>
            </div>
        </div>
    );
}
