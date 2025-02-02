export interface Props {
    ContactRequest: {
        ContactRequestId: number;
        CreatedAt: string;
        Status: string;
        UserSender: {
            UserId: string;
            Name: string;
            AvatarPath: string;
            UserName: string;
            Email: string;
        };
    };
}
