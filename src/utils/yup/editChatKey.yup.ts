import * as Yup from 'yup';
export const editChatKeySchema = Yup.object().shape({
    key: Yup.number()
        .required('This field is required')
        .min(1212112121212121, 'Min value is 1212-1121-2121-2121')
        .max(9006554331798799, 'Max value is 9006-5543-3179-8799'),
});
