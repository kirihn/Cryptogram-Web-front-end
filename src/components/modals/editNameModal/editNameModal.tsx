import { useEffect, useState } from 'react';
import { EditNameForm, Props, ResponseDto } from './types';
import closeIcon from '@icons/clearIcon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editNameSchema } from '@utils/yup/editName.yup';
import './editNameModal.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
export function EditNameModal(props: Props) {
    const [shake, setShake] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editNameSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, EditNameForm>(
        async (body) => {
            return axios.put('/api/profile/updateName', body);
        },
    );

    const onSubmit = async (data: EditNameForm) => {
        execute(data);
    };

    useEffect(() => {
        if (resData) {
            props.handleCloseModal();
            window.location.reload();
        }
    }, [resData]);

    useEffect(() => {
        if (errors.name) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 800);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <div
            className="modalContainer"
            onClick={() => {
                props.handleCloseModal();
            }}
        >
            <div
                className="modalWindow"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="modalheader">
                    <h3>Edit name</h3>
                    <button
                        className="closeModal"
                        onClick={() => props.handleCloseModal()}
                    >
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.name ? (
                        <label className="labelError">
                            * {errors.name.message}
                        </label>
                    ) : (
                        <label className="label">Name</label>
                    )}
                    <input
                        type="text"
                        {...register('name')}
                        placeholder="Name"
                        className="input"
                        maxLength={20}
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
