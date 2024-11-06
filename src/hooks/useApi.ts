// src/hooks/useApi.ts
import { useState } from 'react';
import { json, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

interface ServerError {
    message: string;
}

export function useApi<T, D = undefined>(request: (data?: D) => Promise<any>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const execute = async (body?: D) => {
        setLoading(true);
        try {
            const response = await request(body);
            console.log(response)
            setData(response.data);
        } catch (err) {
            const error = err as AxiosError<ServerError | any>;
            let errorMessage = 'Неизвестная ошибка';
            setData(null);

            if (error.response) {
                if (error.response.data.error === true) {
                    alert(error.response.data.message);
                    return;
                }
                errorMessage = error.response.data.message;
                console.error('Ошибка ответа сервера:', errorMessage);
            } else if (error.request) {
                errorMessage = 'Сервер не ответил';
                console.error('Сервер не ответил:', error.request);
            } else {
                errorMessage = error.message;
                console.error('Ошибка запроса:', errorMessage);
            }

            navigate(`/error?message=${encodeURIComponent(errorMessage)}`);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, execute };
}
