import { useNavigate } from 'react-router-dom';
import { Props, RequestDelContactDto, ResponseDelContactDto } from './types';
import { useSetAtom } from 'jotai';
import { currentChatAtom } from '@jotai/atoms';

import GoToChatIcon from '@assets/icons/goToChat.svg';
import DeleteContact from '@assets/icons/deleteMember.svg';

import './contact.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { useEffect } from 'react';

export function Contact(props: Props) {
    const { contactInfo } = props;

    const navigate = useNavigate();
    const setCurrentChatId = useSetAtom(currentChatAtom);

    const { resData, loading, execute } = useApi<
        ResponseDelContactDto,
        RequestDelContactDto
    >(async (data) => {
        return axios.delete('/api/contact/deleteContactAndChat', { data });
    });

    const goToChat = () => {
        setCurrentChatId(contactInfo.ChatId);
        navigate('/chats');
    };

    const deleteContact = () => {
        const result = confirm(
            'Вы уверены что хотите удалить ' +
                contactInfo.ContactUser.Name +
                ' из контактов и ваш общий чат?',
        );

        if (result) {
            execute({ ContactId: contactInfo.ContactId });
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(contactInfo.ContactUser.Email);
    };
    
    const copyUserName = () => {
        navigator.clipboard.writeText(contactInfo.ContactUser.UserName);
    };

    useEffect(() => {
        if (resData?.message === 'successful') window.location.reload();
    }, [resData]);

    return (
        <div className="contactContainer">
            <div className="contactAvatarContainer">
                <img
                    className="contactAvatarContainer"
                    src={contactInfo.ContactUser.AvatarPath}
                    alt="Contact avatar"
                />
            </div>
            <div className="contactInfoContainer">
                <p className="name">
                    {contactInfo.ContactUser.Name}{' '}
                    <span className="lowText" onClick={copyUserName}>
                        @{contactInfo.ContactUser.UserName}
                    </span>
                </p>
                <p className="email lowText" onClick={copyEmail}>
                    {contactInfo.ContactUser.Email}
                </p>
            </div>
            <div className="buttonsContainer">
                <button className="contactButton" onClick={goToChat}>
                    <img src={GoToChatIcon} alt="Go to chat" />
                </button>
                <button className="contactButton" onClick={deleteContact}>
                    <img src={DeleteContact} alt="Delete contact" />
                </button>
            </div>
        </div>
    );
}
