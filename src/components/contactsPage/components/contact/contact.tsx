import './contact.scss';
import { Props } from './types';

export function Contact(props: Props) {
    const { contactInfo } = props;

    const CopyEmail = () =>{
        navigator.clipboard.writeText(contactInfo.ContactUser.Email);

    }
    const CopyUserName = () =>{
        navigator.clipboard.writeText(contactInfo.ContactUser.UserName);
    }        

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
                    {contactInfo.ContactUser.Name}
                    <span className="lowText" onClick={CopyUserName}>
                         {' '}@{contactInfo.ContactUser.UserName}
                    </span>
                </p>
                <p className="email lowText" onClick={CopyEmail}>{contactInfo.ContactUser.Email}</p>
            </div>
            <div className="buttonsContainer">
            <button
                            className="changeParamButton"
                            onClick={() => {alert(1)}}
                        >q</button>
                            

            </div>
        </div>
    );
}
