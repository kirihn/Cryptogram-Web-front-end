export interface RegFormDto {
    name: string;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface ResponseDto {
    message: string;
    myUserId: string;
    wsToken: string
}
