import * as Yup from 'yup';

export const registrationSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),
    email: Yup.string()
        .required('This field is required')
        .email('Invalid email format'),
    username: Yup.string()
        .required('This field is required')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'The user name can contain only English letters, numbers, and underscores',
        ),
    password: Yup.string()
        .required('This field is required')
        .min(1, 'password must be 8 least characters long'),
    repeatPassword: Yup.string()
        .required('This field is required')
        .min(1, 'password must be 8 least characters long')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});
