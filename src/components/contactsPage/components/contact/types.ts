export interface Props {
    contactInfo: ContactInfo;
}

export interface ContactInfo {
    ContactId: number;
    ChatId: number;
    CreatedAt: string;
    UpdatedAt: string;
    ContactUser: {
        UserId: string;
        Name: string;
        AvatarPath: string;
        UserName: string;
        Email: string;
    };
}
