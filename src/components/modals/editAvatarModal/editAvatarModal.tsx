import { useEffect, useState } from 'react';
import { EditAvatarForm, Props, ResponseDto } from './types';
import closeIcon from '@icons/clearIcon.svg';
import uploadFileIcon from '@icons/uplodaFile.svg';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import './editAvatarModal.scss';
import { editAvatarSchema } from '@utils/yup/editAvatar.yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export function EditAvatarModal(props: Props) {
    const [shake, setShake] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditAvatarForm>({
        resolver: yupResolver(editAvatarSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, FormData>(
        async (body) => {
            console.log('useApi');
            return axios.post(`api/${props.avatarType}/uploadAvatar`, body, {
                headers: { 'Content-Type': 'multipart/form-data' },
                params: { chatId: props.chatId },
            });
        },
    );

    const onSubmit = async (data: EditAvatarForm) => {
        const formData = new FormData();
        formData.append('avatar', data.avatar[0]);
        execute(formData);
    };

    useEffect(() => {
        if (errors.avatar) {
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
                    <h3>Edit {props.avatarType} avatar</h3>
                    <button
                        className="closeModal"
                        onClick={() => props.handleSwitchModal(null)}
                    >
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="file" className="label">
                        <div className="input">
                            <img
                                src={uploadFileIcon}
                                alt="upload avatar"
                                className="uploadAvatar"
                            />
                            {errors.avatar ? (
                                <label htmlFor="file" className="labelError">
                                    * {errors.avatar.message}
                                </label>
                            ) : (
                                <label className="label" htmlFor="file">
                                    Upload avatar
                                </label>
                            )}
                        </div>
                    </label>
                    <input
                        type="file"
                        id="file"
                        {...register('avatar')}
                        accept="image/*"
                        className="inputFile"
                    />
                    <button
                        className={`button neonBox ${
                            shake ? 'shake-horizontal' : ''
                        }`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : 'Загрузить'}
                    </button>
                </form>
            </div>
        </div>
    );
}
