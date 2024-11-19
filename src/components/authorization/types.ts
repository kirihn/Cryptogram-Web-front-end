import { string } from 'yup';

export interface AuthFormDto {
    email: string;
    password: string;
}

export interface ResponseDto {
    message: string;
}
