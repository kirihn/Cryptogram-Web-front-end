import * as Yup from 'yup';
export const createChatSchema = Yup.object().shape({
    chatName: Yup.string().required('This field is required'),
    isGroup: Yup.boolean().required('This field is required'),
    keyHash: Yup.string().required('This field is required'),
    key: Yup.number().required('This field is required'),
    userId: Yup.string()
    .nullable()
    .when('isGroup', (isGroup, schema) => 
        !isGroup ? schema.required('The userId must not be empty') : schema
    )
});


