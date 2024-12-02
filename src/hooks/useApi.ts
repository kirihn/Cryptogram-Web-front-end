// src/hooks/useApi.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

interface ServerError {
    error: boolean;
    show: boolean;
    message: string;
}

export function useApi<T, D = undefined>(request: (data?: D) => Promise<any>) {
    const [resData, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const execute = async (body?: D) => {

        setLoading(true);
        try {
            console.log(body)
            const response = await request(body);
            console.log(response);
            setData(response.data);
        } catch (err) {
            const error = err as AxiosError<ServerError | any>;
            let errorMessage = 'Неизвестная ошибка';

            console.error("Обнуляем resData")
            setData(null);
        
            if (error.response) { 
                const serverError = error.response.data;
        
                if (serverError && serverError.show === true) {
                    alert(serverError.message);
                    return;
                }
        
                errorMessage = serverError.message || 'Отсутствует сообщение об ошибке';
                console.error('Ошибка ответа сервера:', errorMessage);
                navigate(`/error?message=${encodeURIComponent(errorMessage)}&statusCode=${error.response.status}&statusText=${error.response.statusText}`);
            } else if (error.request) {
                
                errorMessage = 'Сервер не ответил. Проверьте подключение к сети.';
                console.error('Сервер не ответил:', error.request);
        

                navigate(`/error?message=${encodeURIComponent(errorMessage)}`);
            } else { 
                
                errorMessage = error.message || 'Ошибка запроса';
                console.error('Ошибка запроса:', errorMessage);
        

                navigate(`/error?message=${encodeURIComponent(errorMessage)}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return { resData: resData, setResData: setData, loading, execute };
}
