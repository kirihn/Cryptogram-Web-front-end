import { string } from 'yup';

export interface AuthFormDto {
    email: string;
    password: string;
}

export interface ResponseDto {
    userId: string;
    email: string;
    username: string;
}
