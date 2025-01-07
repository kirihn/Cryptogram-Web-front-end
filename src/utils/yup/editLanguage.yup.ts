import * as Yup from 'yup';

export const Languages = ['ru', 'en', 'fr', 'de'];
export const editLanguageSchema = Yup.object().shape({
    language: Yup.string()
        .required('This field is required')
        .oneOf(Languages, 'Invalid language selected'),
});
