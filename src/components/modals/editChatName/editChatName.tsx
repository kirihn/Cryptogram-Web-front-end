import { useEffect, useState } from 'react';
import { Props, RequestDto, ResponseDto } from './types';
import closeIcon from '@icons/clearIcon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './editChatName.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { currentChatAtom } from '@jotai/atoms';
import { editChatNameSchema } from '@utils/yup/editChatName.yup';
export function EditChatNameModal(props: Props) {
    const [shake, setShake] = useState(false);

    const currentChatId = useAtomValue(currentChatAtom);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editChatNameSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, RequestDto>(
        async (body) => {
            return axios.put('/api/chat/updateChatName', body);
        },
    );

    const onSubmit = async (data: any) => {
        execute({ ...data, chatId: currentChatId });
    };

    useEffect(() => {
        if (resData) {
            props.handleSwitchModal(null);
            window.location.reload();
        }
    }, [resData]);

    useEffect(() => {
        if (errors.chatName) {
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
                    <h3>Edit chat name</h3>
                    <button
                        className="closeModal"
                        onClick={() => props.handleSwitchModal(null)}
                    >
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.chatName ? (
                        <label className="labelError">
                            * {errors.chatName.message}
                        </label>
                    ) : (
                        <label className="label">Chat name</label>
                    )}
                    <input
                        type="text"
                        {...register('chatName')}
                        placeholder="Chat name"
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
