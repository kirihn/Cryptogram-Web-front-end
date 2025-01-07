import { yupResolver } from '@hookform/resolvers/yup';
import './authorizationPage.scss';
import { useForm } from 'react-hook-form';
import { authSchema } from '@utils/yup/auth.yup';
import { AuthFormDto, ResponseDto } from './types';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { currentChatAtom, myUserIdAtom, wsTokenAtom } from '@jotai/atoms';

export function AuthorizationPage() {
    const navigate = useNavigate();

    const [shake, setShake] = useState(false);

    const setMyUserId = useSetAtom(myUserIdAtom);
    const setWsToken = useSetAtom(wsTokenAtom);
    const setCurrentChatId = useSetAtom(currentChatAtom);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(authSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, AuthFormDto>(
        async (body) => {
            return await axios.post('api/auth/login', body);
        },
    );

    const onSubmit = async (data: AuthFormDto) => {
        await execute(data);
    };

    useEffect(() => {
        if (errors.email || errors.password) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 800);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        if (resData?.message === 'successful') {
            setMyUserId(resData.myUserId);
            setWsToken(resData.wsToken);
            setCurrentChatId(-1);
            navigate('/chats');
        }
    }, [resData]);

    return (
        <div className="authPageContainer">
            <div className="authBlock">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {errors.email ? (
                            <label className="labelError">
                                * {errors.email.message}
                            </label>
                        ) : (
                            <label className="label">Электронная почта</label>
                        )}

                        <input
                            className="input"
                            {...register('email')}
                            placeholder="email"
                        />
                    </div>

                    <div>
                        {errors.password ? (
                            <label className="labelError">
                                * {errors.password.message}
                            </label>
                        ) : (
                            <label className="label">Пароль</label>
                        )}
                        <input
                            className="input"
                            type="password"
                            {...register('password')}
                            placeholder="password"
                        />
                    </div>

                    <div>
                        <a href="#">Забыли пароль?</a>
                    </div>

                    <button
                        className={`button neonBox ${
                            shake ? 'shake-horizontal' : ''
                        }`}
                        type="submit"
                    >
                        {loading ? 'Загрузка...' : 'Отправить'}
                    </button>
                </form>

                <Link to="/registration">Нет аккаунта? Регистрация</Link>
            </div>
        </div>
    );
}
