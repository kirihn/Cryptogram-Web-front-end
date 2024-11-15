import * as Yup from 'yup';

export const editNameSchema = Yup.object().shape({
    name: Yup.string().required('This field is required'),
});
