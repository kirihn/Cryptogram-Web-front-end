import * as Yup from 'yup';

export const authSchema = Yup.object().shape({
    email: Yup.string()
        .required('This field is required')
        .email('Invalid email format')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format',
        ),
    password: Yup.string()
        .required('This field is required')
        .min(8, 'password must be 8 least characters long'),
});
