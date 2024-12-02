import * as Yup from 'yup';

export const addMemberSchema = Yup.object().shape({
    username: Yup.string()
        .required('This field is required')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'The user name can contain only English letters, numbers, and underscores',
        ),
    role: Yup.number()
        .required('This field is required')
        .oneOf([1, 2, 3, 4, 5], 'Invalid role selected'),
});
