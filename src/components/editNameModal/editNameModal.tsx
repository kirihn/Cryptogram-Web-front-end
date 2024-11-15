import { useState } from 'react';
import { Props } from './types';
import closeIcon from '@icons/clearIcon.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export function EditNameModal(props: Props) {
    const [shake, setShake] = useState(false);
    const {
        register,
        handlesubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(editNameSchema),
    });
    return (
        <div className="modalContainer">
            <div className="modalWindow">
                <button
                    className="closeModal"
                    onClick={() => props.handleSwitchModal(null)}
                >
                    <img src={closeIcon} alt="Close" />
                </button>
            </div>
        </div>
    );
}
