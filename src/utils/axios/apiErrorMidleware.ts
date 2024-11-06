import axios, { Axios, AxiosError } from 'axios';

interface ServerError {
    error: boolean;
    message: string;
}
const api = axios.create({
    //baseURL: 'http://localhost:3000',
    timeout: 5000,
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ServerError>) => {
        if (error.response) {
            // Обработка ошибок от сервера
            console.error(
                'Ошибка ответа сервера:',
                error.response.data.message,
            );
        } else if (error.request) {
            // Сервер не ответил
            console.error('Сервер не ответил:', error.request);
        } else {
            // Ошибка настройки запроса
            console.error('Ошибка запроса:', error.message);
        }
        return Promise.reject(error);
    },
);
