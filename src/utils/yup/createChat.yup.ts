import * as Yup from 'yup';
export const createChatSchema = Yup.object().shape({
    chatName: Yup.string().required('This field is required'),
    isGroup: Yup.boolean().required('This field is required'),
    keyHash: Yup.string().required('This field is required'),
    key: Yup.number()
        .required('This field is required')
        .min(1000200030004000, 'Min value is 1000 2000 3000 4000')
        .max(9006554331798799, 'Max value is 9006 5543 3179 8799'),
    userId: Yup.string()
        .nullable()
        .when('isGroup', (isGroup, schema) =>
            !isGroup ? schema.required('The userId must not be empty') : schema,
        ),
});
