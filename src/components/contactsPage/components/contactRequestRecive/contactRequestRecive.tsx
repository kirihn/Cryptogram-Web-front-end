import './contactRequestRecive.scss';
import { Props } from './types';

export function ContactRequestRecive(props: Props) {
    const contactRequest = props.ContactRequest;

    const copyUserName = () => {
        navigator.clipboard.writeText(contactRequest.UserSender.UserName);
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
                <button className="contactButtonAccept neonBox contactButton">Accept</button>
                {contactRequest.Status === 'pending' && (
                    <button className="contactButtonBlock neonBox contactButton">
                        block
                    </button>
                )}
            </div>
        </div>
    );
}
