import { useEffect, useState } from 'react';
import { AddMemberForm, Props, RequestDto, ResponseDto } from './types';
import closeIcon from '@icons/clearIcon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './addMemberModal.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { addMemberSchema } from '@utils/yup/addMember.yup';

export function AddMemberModal(props: Props) {
    const [shake, setShake] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(addMemberSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, RequestDto>(
        async (body) => {
            return axios.post('/api/chat/addMember', body);
        },
    );

    const onSubmit = async (data: AddMemberForm) => {
        execute({ ...data, chatId: props.chatId });
    };

    useEffect(() => {
        if (resData) {
            props.handleSwitchModal(null);
            window.location.reload();
        }
    }, [resData]);

    useEffect(() => {
        if (errors.username) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 800);
            return () => clearTimeout(timer);
        }
    }, [errors]);

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
                    <h3>Add member</h3>
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
                        <label className="label">Name</label>
                    )}
                    <input
                        type="text"
                        {...register('username')}
                        placeholder="@Username"
                        className="input"
                    />
                    {errors.role ? (
                        <label className="labelError">
                            * {errors.role.message}
                        </label>
                    ) : (
                        <label className="label">Role</label>
                    )}
                    <select {...register('role')} className="input">
                        <option value="" disabled selected>
                            Выберите роль
                        </option>
                        {props.myRole <= 1 && (
                            <option value={1}>Владелец</option>
                        )}
                        {props.myRole < 2 && (
                            <option value={2}>Администратор</option>
                        )}
                        {props.myRole < 3 && (
                            <option value={3}>Участник+</option>
                        )}
                        {props.myRole < 4 && (
                            <option value={4}>Участник</option>
                        )}
                        {props.myRole < 5 && (
                            <option value={5}>Читатель</option>
                        )}
                    </select>
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
