import * as Yup from "yup";
export const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('please enter your first name'),
    lastName: Yup.string().required('please enter your last name'),
    phone:Yup.number('phone number must be a number').required('please enter phone number'),
    email:Yup.string()
    .email('Invalid email address') // Check if the email is valid
    .required('Email is required'),  // Ensure email is not empty
    password:Yup.string()
    .min(8, 'Password must be at least 8 characters')  // Minimum length of 8
    .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // At least one uppercase letter
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // At least one lowercase letter
    .matches(/[0-9]/, 'Password must contain at least one number')  // At least one number
    .matches(/[\W_]/, 'Password must contain at least one special character')  // At least one special character (e.g., !, @, #, etc.)
    .required('Password is required'),  // Ensure password is not empty
});