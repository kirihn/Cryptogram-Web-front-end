import * as Yup from 'yup';
export const editChatKeySchema = Yup.object().shape({
    key: Yup.number()
        .required('This field is required')
        .min(1000200030004000, 'Min value is 1000 2000 3000 4000')
        .max(9006554331798799, 'Max value is 9006 5543 3179 8799'),
});
