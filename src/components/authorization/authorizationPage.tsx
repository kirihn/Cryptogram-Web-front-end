import { yupResolver } from '@hookform/resolvers/yup';
import './authorizationPage.scss';
import { useForm } from 'react-hook-form';
import { authSchema } from '@utils/yup/auth.yup';
import { authFormDto } from './types';

export function AuthorizationPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(authSchema),
    });

    const onSubmit = (data: authFormDto) => {
        console.log('Данные формы:', data);
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
                        Отправить
                    </button>
                </form>
                <a href="/registration">Нет аккаунта? Регистрация</a>
            </div>
        </div>
    );
}
