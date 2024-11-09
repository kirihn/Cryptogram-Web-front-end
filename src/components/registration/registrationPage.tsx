import { useForm } from 'react-hook-form';
import { RegFormDto, ResponseDto } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '@utils/yup/register.yup';
import './registrationPage.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationPage() {
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
        //alert('полученный ответ' + JSON.stringify(resData, null, 4));
    };

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

                    <button className="button neonBox" type="submit">
                        {loading ? 'Загрузка...' : 'Отправить'}
                    </button>
                </form>
                <Link to="/authorization">Уже есть аккаунт? Вход</Link>
            </div>
        </div>
    );
}
// export class RegisterDto {
//     @IsString()
//     @IsNotEmpty({ message: 'The name must not be empty' })
//     name: string;

//     @IsEmail()
//     email: string;

//     @IsNotEmpty({ message: 'The username must not be empty' })
//     @Matches(/^[a-zA-Z0-9_]+$/, {
//         message:
//             'The user name can contain only English letters, numbers, and underscores',
//     })
//     username: string;

//     @IsString()
//     @MinLength(1, {
//         // 8
//         message: 'password must be 8 least characters long',
//     })
//     password: string;

//     @IsString()
//     @MinLength(1, {
//         // 8
//         message: 'password must be 8 least characters long',
//     })
//     repeatPassword: string;
// }
