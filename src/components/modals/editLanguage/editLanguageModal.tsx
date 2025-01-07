import { useEffect, useState } from 'react';
import { Props, RequestDto, ResponseDto } from './types';
import closeIcon from '@icons/clearIcon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import './editLanguageModal.scss';
import { useApi } from 'hooks/useApi';
import axios from 'axios';
import { editLanguageSchema, Languages } from '@utils/yup/editLanguage.yup';
import { useSetAtom } from 'jotai';
import { LangModeAtom } from '@jotai/atoms';

export function EditLanguageModal(props: Props) {
    const [shake, setShake] = useState(false);

    const setLangAtom = useSetAtom(LangModeAtom);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editLanguageSchema),
    });

    const { resData, loading, execute } = useApi<ResponseDto, RequestDto>(
        async (body) => {
            return axios.put('/api/profile/updateLanguage', body);
        },
    );

    const onSubmit = async (data: RequestDto) => {
        execute(data);
    };

    useEffect(() => {
        if (resData) {
            props.handleCloseModal();
            setLangAtom(resData.newLanguage);
            window.location.reload();
        }
    }, [resData]);

    useEffect(() => {
        if (errors.language) {
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
                    <h3>Choice language</h3>
                    <button
                        className="closeModal"
                        onClick={() => props.handleCloseModal()}
                    >
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.language ? (
                        <label className="labelError">
                            * {errors.language.message}
                        </label>
                    ) : (
                        <label className="label">Language</label>
                    )}
                    <select {...register('language')} className="input">
                        {Languages.map((lang) => (
                            <option value={lang}>{lang}</option>
                        ))}
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
