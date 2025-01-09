import * as Yup from 'yup';
import { Languages } from '@utils/params/Languages';

export const editLanguageSchema = Yup.object().shape({
    language: Yup.string()
        .required('This field is required')
        .oneOf(
            Languages.map((lang) => lang.iso1),
            'Invalid language selected',
        ),
});
