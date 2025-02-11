import { useApi } from 'hooks/useApi';
import { Contact } from '../contact/contact';
import './myContacts.scss';
import { ResponseDto } from './types';
import axios from 'axios';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { socketAtom } from '@jotai/atoms';
export function MyContacts() {
    const socket = useAtomValue(socketAtom);

    const {
        resData: contactListData,
        setResData: setChatsListData,
        loading,
        execute: executeContactList,
    } = useApi<ResponseDto[]>(async () => {
        return axios.get('/api/contact/getMyContacts');
    });

    useEffect(() => {
        if (!socket) return;

        socket.on('addNewContact', executeContactList);
        socket.on('deleteContact', executeContactList);
    }, [socket]);

    useEffect(() => {
        executeContactList();
    }, []);

    return (
        <div className="myContactsContainer">
            <h2 className="h2">Contacts</h2>
            <img src="" alt="" />
            <div className="contactsList">
                {contactListData?.map((contact) => (
                    <Contact contactInfo={contact} key={contact.ContactId} />
                ))}
            </div>
        </div>
    );
}
