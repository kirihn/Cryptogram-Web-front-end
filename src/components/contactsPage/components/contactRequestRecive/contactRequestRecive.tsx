import { useApi } from 'hooks/useApi';
import './contactRequestRecive.scss';
import {
    AddContactResponseDto,
    Props,
    ResponseAddContactResponseDto,
} from './types';
import axios from 'axios';

export function ContactRequestRecive(props: Props) {
    const contactRequest = props.ContactRequest;

    const copyUserName = () => {
        navigator.clipboard.writeText(contactRequest.UserSender.UserName);
    };

    const {
        resData: responseToContactRequestData,
        execute: executeResponseToContactRequest,
    } = useApi<ResponseAddContactResponseDto, AddContactResponseDto>(
        async (data) => {
            return axios.put('/api/contact/addContactResponse', data);
        },
    );
    const responseToContactRequest = (status: string) => {
        executeResponseToContactRequest({
            ContactRequestId: contactRequest.ContactRequestId,
            NewContactRequestStatus: status,
        });
    };
    return (
        <div className="contactRequestContainer">
            <div className="userInfo">
                <div className="AvatarContainer">
                    <img
                        src={contactRequest.UserSender.AvatarPath}
                        alt="user sender avatar"
                    />
                </div>
                <div className="contactInfoContainer">
                    <p className="name">{contactRequest.UserSender.Name} </p>
                    <p className="lowText" onClick={copyUserName}>
                        @{contactRequest.UserSender.UserName}
                    </p>
                </div>
            </div>
            <div className="buttonsContainer">
                <button
                    className="contactButtonAccept neonBox contactButton"
                    onClick={() => responseToContactRequest('accepted')}
                >
                    Accept
                </button>
                {contactRequest.Status === 'pending' && (
                    <button
                        className="contactButtonBlock neonBox contactButton"
                        onClick={() => responseToContactRequest('blocked')}
                    >
                        block
                    </button>
                )}
            </div>
        </div>
    );
}
