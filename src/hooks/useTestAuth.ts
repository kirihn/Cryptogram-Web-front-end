import axios from 'axios';
import { useEffect } from 'react';
import { useApi } from './useApi';

export function useTestAuth() {
    const { execute } = useApi(async () => {
        return axios.get('/api/auth/testAuth');
    });

    useEffect(() => {
        execute();
    }, []);
}
