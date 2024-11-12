import { yupResolver } from '@hookform/resolvers/yup';
import { createChatSchema } from '@utils/yup/createChat.yup';
import { useForm } from 'react-hook-form';

export function CreateChat() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(createChatSchema) });

    return (
        <div className="addFormContainer">
            <h2>Create new chat</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="addChatForm">
                <div>
                    {errors.chatName ? (
                        <label className="labelError">
                            * {errors.chatName.message}
                        </label>
                    ) : (
                        <label className="label">chat name</label>
                    )}
                </div>
            </form>
        </div>
    );
}
