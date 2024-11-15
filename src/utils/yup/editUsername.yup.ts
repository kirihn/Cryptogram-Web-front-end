import * as Yup from 'yup';

export const editNameSchema = Yup.object().shape({
    username: Yup.string()
        .required('This field is required')
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'The user name can contain only English letters, numbers, and underscores',
        ),
});
