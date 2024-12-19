import * as Yup from 'yup';

export const editPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('This field is required')
        .min(8, 'password must be 8 least characters long'),
    password: Yup.string()
        .required('This field is required')
        .min(8, 'password must be 8 least characters long'),
    repeatPassword: Yup.string()
        .required('This field is required')
        .min(8, 'password must be 8 least characters long')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
});
