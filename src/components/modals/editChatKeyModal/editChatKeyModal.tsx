import { useEffect, useState } from 'react';
import { Props } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
    currentChatAtom,
    keyValueActionsAtom,
    myUserIdAtom,
} from '@jotai/atoms';
import { editChatKeySchema } from '@utils/yup/editChatKey.yup';
import closeIcon from '@icons/clearIcon.svg';

export function EditChatKeyModal(props: Props) {
    const [shake, setShake] = useState(false);

    const [currentChatId, setCurrentChatId] = useAtom(currentChatAtom);
    const setCryptoKey = useSetAtom(keyValueActionsAtom);
    const currentUserId = useAtomValue(myUserIdAtom);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editChatKeySchema),
    });

    const handleCloseModal = () => {
        if (props.isChangedChatId) setCurrentChatId(-1);
        props.handleCloseModal();
    };

    const onSubmit = async (data: any) => {
        setCryptoKey({
            type: 'add',
            key: 'KeyForChat-' + currentChatId + '-user-' + currentUserId,
            value: data.key,
        });
        props.handleCloseModal();
    };

    useEffect(() => {
        if (errors.key) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), 800);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <div className="modalContainer" onClick={handleCloseModal}>
            <div
                className="modalWindow"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="modalheader">
                    <h3>Set chat key</h3>
                    <button className="closeModal" onClick={handleCloseModal}>
                        <img src={closeIcon} alt="Close" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {errors.key ? (
                        <label className="labelError">
                            * {errors.key.message}
                        </label>
                    ) : (
                        <label className="label">
                            you need to input the correct key to access the chat
                        </label>
                    )}
                    <input
                        type="number"
                        // min={1212112121212121}
                        // max={9006554331798799}
                        {...register('key')}
                        placeholder="Chat key"
                        className="input"
                    />
                    <button
                        className={`button neonBox ${
                            shake ? 'shake-horizontal' : ''
                        }`}
                        type="submit"
                    >
                        сохранить
                    </button>
                </form>
            </div>
        </div>
    );
}
