import { yupResolver } from '@hookform/resolvers/yup';
import './authorizationPage.scss';
import { useForm } from 'react-hook-form';
import { authSchema } from '@utils/yup/auth.yup';
import { AuthFormDto, ResponseDto } from './types';
import { useApi } from 'hooks/useApi';
import axios from 'axios';

export function AuthorizationPage() {
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

    const onSubmit = (data: AuthFormDto) => {
        console.log('Данные формы:', data);
        execute(data);
        //alert(resData?.username)
    };

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

                    <button className="button neonBox" type="submit">
                        {loading ? 'Загрузка...' : 'Отправить'}
                    </button>
                </form>
                <a href="/registration">Нет аккаунта? Регистрация</a>
                {resData ? <p>{resData.username}</p> : null}
            </div>
        </div>
    );
}
