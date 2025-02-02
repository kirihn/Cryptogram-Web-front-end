export interface ResponseDto {
    SentContactRequests: SentContactRequestsDto[];
    ReceivedContactRequests: ReceivedContactRequestsDto[];
}

export interface SentContactRequestsDto {
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
}
export interface ReceivedContactRequestsDto {
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
}
