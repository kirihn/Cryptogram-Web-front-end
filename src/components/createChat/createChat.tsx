import { yupResolver } from '@hookform/resolvers/yup';
import { createChatSchema } from '@utils/yup/createChat.yup';
import { useApi } from 'hooks/useApi';
import { useForm } from 'react-hook-form';
import { CreateChatFormDto, ResponseDto } from './types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as CryptoJS from 'crypto-js';

import './createChat.scss';
import { useSetAtom } from 'jotai';
import { currentChatAtom, keyValueActionsAtom } from '@jotai/atoms';
import { useNavigate } from 'react-router-dom';
export function CreateChat() {
    const [shake, setShake] = useState(false);
    const navigate = useNavigate();
    const setCryptoKey = useSetAtom(keyValueActionsAtom);
    const setCurrentChatId = useSetAtom(currentChatAtom);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(createChatSchema),
        defaultValues: {
            isGroup: true,
            keyHash: '',
        },
    });

    const key = watch('key');

    const { resData, loading, execute } = useApi<
        ResponseDto,
        CreateChatFormDto
    >(async (data) => {
        return await axios.post('/api/chat/createChat', data);
    });

    const onSubmit = async (data: CreateChatFormDto) => {
        await execute(data);
    };

    useEffect(() => {
        if (resData) {
            setCryptoKey({
                type: 'add',
                key: 'KeyForChat' + resData.ChatId,
                value: Number(key),
            });

            setCurrentChatId(Number(resData.ChatId));

            navigate('/chats');
        }
        if (errors.chatName || errors.key) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 800);
            return () => clearTimeout(timer);
        }
    }, [errors, resData]);

    useEffect(() => {
        if (key) {
            const keyhash = CryptoJS.SHA256(key.toString()).toString(
                CryptoJS.enc.Base64,
            );
            setValue('keyHash', keyhash);
        }
    }, [key]);

    return (
        <div className="CreateChatPage">
            <div className="CreateChatFormContainer">
                <h2>Create new chat</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="addChatForm">
                    <div>
                        {errors.chatName ? (
                            <label className="labelError">
                                * {errors.chatName.message}
                            </label>
                        ) : (
                            <label className="label">Chat name</label>
                        )}
                        <input
                            type="text"
                            className="input"
                            {...register('chatName')}
                            placeholder="Chat name"
                        />
                    </div>

                    <div>
                        {errors.key?.message ? (
                            <label className="labelError">
                                * {errors.key?.message}
                            </label>
                        ) : (
                            <label className="label">Chat private key</label>
                        )}
                        <input
                            type="number"
                            className="input"
                            {...register('key')}
                            placeholder="Chat private key"
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
            </div>
        </div>
    );
}
