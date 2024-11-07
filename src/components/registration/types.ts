export interface RegFormDto {
    name: string;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export interface ResponseDto {
    userId: string;
    email: string;
    username: string;
}
