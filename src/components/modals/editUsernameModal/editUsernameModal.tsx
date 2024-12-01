import { useEffect, useState } from 'react';
import { EditUserameForm, Props, ResponseDto } from './types';
import closeIcon from '@icons/clearIcon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUsernameSchema } from '@utils/yup/editUsername.yup';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import './editUsernameModal.scss';
export function EditUserameModal(props: Props) {
    const [shake, setShake] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editUsernameSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, EditUserameForm>(
        async (body) => {
            return axios.put('/api/profile/updateUsername', body);
        },
    );

    const onSubmit = async (data: EditUserameForm) => {
        execute(data);
    };

    useEffect(() => {
        if (errors.username) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 800);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        if (resData) {
            props.handleSwitchModal(null);
            window.location.reload();
        }
    }, [resData]);

    return (
        <div
            className="modalContainer"
            onClick={() => {
                props.handleSwitchModal(null);
            }}
        >
            <div
                className="modalWindow"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
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
                    {errors.username ? (
                        <label className="labelError">
                            * {errors.username.message}
                        </label>
                    ) : (
                        <label className="label">Username</label>
                    )}
                    <input
                        type="text"
                        {...register('username')}
                        placeholder="Username"
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
