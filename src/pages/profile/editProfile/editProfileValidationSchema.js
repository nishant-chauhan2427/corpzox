import * as yup from "yup";

export const profileValidationSchema = yup.object({
    fullName: yup
        .string()
        .required("Full name is required")
        .min(2, "Full name must be at least 2 characters")
        .max(40, "Full name must be less then 40 characters"),
    email: yup.string()
        .email('Invalid email address')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email address'
        ),
    businessEmail: yup
        .string()
        .email('Invalid businessEmail address')
        .max(50, 'businessEmail cannot be longer than 50 characters')
        .nullable()
        .notRequired()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid businessEmail address'
        ),
    phone: yup.string()
        .required('Phone no is required')
        .min(9, 'Phone number must be at least 9 characters')
        .max(15, 'Phone number cannot exceed 15 characters'),

});
