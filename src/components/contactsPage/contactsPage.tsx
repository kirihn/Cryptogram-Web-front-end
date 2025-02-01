import { AddContacts } from './components/addContacts/addContacts';
import { MyContactRequests } from './components/myContactRequests/myContactRequests';
import { MyContacts } from './components/myContacts/myContacts';
import './contactsPage.scss';
export function ContactsPage() {
    return (
        <div className="contactsPage">
            <MyContacts />
            <MyContactRequests />
            <AddContacts />
        </div>
    );
}
