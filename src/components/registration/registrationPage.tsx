import { useForm } from 'react-hook-form';
import { RegFormDto, ResponseDto } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '@utils/yup/register.yup';
import './registrationPage.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function RegistrationPage() {
    const navigate = useNavigate();
    const [shake, setShake] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registrationSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, RegFormDto>(
        async (data) => {
            return await axios.post('/api/auth/register', data);
        },
    );

    const onSubmit = async (data: RegFormDto) => {
        console.log('Данные формы:', data);
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
            navigate('/chats');
        }
    }, [resData]);

    return (
        <div className="registerPageContainer">
            <div className="registerBlock">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {errors.name ? (
                            <label className="labelError">
                                * {errors.name.message}
                            </label>
                        ) : (
                            <label className="label">Имя</label>
                        )}

                        <input
                            className="input"
                            {...register('name')}
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        {errors.username ? (
                            <label className="labelError">
                                * {errors.username.message}
                            </label>
                        ) : (
                            <label className="label">Имя пользователя</label>
                        )}

                        <input
                            className="input"
                            {...register('username')}
                            placeholder="Username"
                        />
                    </div>

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
                            placeholder="Email"
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
                            placeholder="Password"
                        />
                    </div>

                    <div>
                        {errors.repeatPassword ? (
                            <label className="labelError">
                                * {errors.repeatPassword.message}
                            </label>
                        ) : (
                            <label className="label">Повторите пароль</label>
                        )}
                        <input
                            className="input"
                            type="password"
                            {...register('repeatPassword')}
                            placeholder="Repeat password"
                        />
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
                <Link to="/authorization">Уже есть аккаунт? Вход</Link>
            </div>
        </div>
    );
}
