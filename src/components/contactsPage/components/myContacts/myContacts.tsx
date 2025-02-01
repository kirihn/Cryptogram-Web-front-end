import { useApi } from 'hooks/useApi';
import { Contact } from '../contact/contact';
import './myContacts.scss';
import { ResponseDto } from './types';
import axios from 'axios';
import { useEffect } from 'react';
export function MyContacts() {
    const {
        resData: contactListData,
        setResData: setChatsListData,
        loading,
        execute: executeContactList,
    } = useApi<ResponseDto[]>(async () => {
        const a = await axios.get('/api/contact/getMyContacts');
        console.log(a);
        return a;
    });

    useEffect(() => {
        executeContactList();
    }, []);

    return (
        <div className="myContactsContainer">
            <h2 className="h2">Contacts</h2>
            <div className="contactsList">
                {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
                   {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
            </div>
        </div>
    );
}
