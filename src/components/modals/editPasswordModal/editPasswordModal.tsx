import { useEffect, useState } from 'react';
import { EditPasswordForm, Props, ResponseDto } from './types';
import closeIcon from '@icons/clearIcon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUsernameSchema } from '@utils/yup/editUsername.yup';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import './editPasswordModal.scss';
import { editPasswordSchema } from '@utils/yup/editPassword.yup';

export function EditPasswordModal(props: Props) {
    const [shake, setShake] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editPasswordSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, EditPasswordForm>(
        async (body) => {
            return axios.put('/api/profile/updatePassword', body);
        },
    );

    const onSubmit = async (data: EditPasswordForm) => {
        execute(data);
    };

    useEffect(() => {
        if (errors.oldPassword || errors.password || errors.repeatPassword) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 800);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <div className="modalContainer">
            <div className="modalWindow">
                <div className="modalheader">
                    <h3>Edit username</h3>
                    <button
                        className="closeModal"
                        onClick={() => props.handleSwitchModal(null)}
                    >
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.oldPassword ? (
                        <label className="labelError">
                            * {errors.oldPassword.message}
                        </label>
                    ) : (
                        <label className="label">Old password</label>
                    )}
                    <input
                        type="password"
                        {...register('oldPassword')}
                        placeholder="Old password"
                        className="input"
                    />

                    {errors.password ? (
                        <label className="labelError">
                            * {errors.password.message}
                        </label>
                    ) : (
                        <label className="label">Password</label>
                    )}
                    <input
                        type="password"
                        {...register('password')}
                        placeholder="Password"
                        className="input"
                    />

                    {errors.repeatPassword ? (
                        <label className="labelError">
                            * {errors.repeatPassword.message}
                        </label>
                    ) : (
                        <label className="label">Repeat password</label>
                    )}
                    <input
                        type="password"
                        {...register('repeatPassword')}
                        placeholder="Repeat password"
                        className="input"
                    />
                    <button
                        className={`button neonBox ${
                            shake ? 'shake-horizontal' : ''
                        }`}
                        type="submit"
                    >
                        {loading ? 'Загрузка...' : 'сохранить'}
                    </button>
                </form>
            </div>
        </div>
    );
}
