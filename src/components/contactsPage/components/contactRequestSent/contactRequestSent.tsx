import './contactRequestSent.scss';
import { Props } from './types';

export function ContactRequestSent(props: Props) {
    const contactRequest = props.ContactRequest;

    const copyUserName = () => {
        navigator.clipboard.writeText(contactRequest.UserRecipient.UserName);
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
                <button className="contactButtonRevoke neonBox contactButton">revoke</button>
            </div>
        </div>
    );
}
