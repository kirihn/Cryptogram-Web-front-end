import * as Yup from 'yup';

export const editAvatarSchema = Yup.object().shape({
    avatar: Yup.mixed<FileList>()
        .required('file is required')
        .test(
            'fileType',
            'only (jpg, jpeg, png, gif)',
            (value) => {
                if (!value || value.length === 0) return false;
                return ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(
                    value[0].type,
                );
            },
        ),
});
