export interface Props {
    ContactRequest: {
        ContactRequestId: number;
        CreatedAt: string;
        Status: string;
        UserRecipient: {
            UserId: string;
            Name: string;
            AvatarPath: string;
            UserName: string;
            Email: string;
        };
    };
}
