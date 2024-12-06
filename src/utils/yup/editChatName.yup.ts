import * as Yup from 'yup';

export const editChatNameSchema = Yup.object().shape({
    chatName: Yup.string().required('This field is required'),
});
