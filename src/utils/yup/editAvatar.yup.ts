import * as Yup from 'yup';

export const editAvatarSchema = Yup.object().shape({
    file: Yup.mixed<FileList>()
        .required('file is required')
        .test(
            'fileType',
            'only (jpg, jpeg, png)',
            (value) => {
                if (!value || value.length === 0) return false;
                return ['image/jpeg', 'image/png', 'image/jpg'].includes(
                    value[0].type,
                );
            },
        ),
});
