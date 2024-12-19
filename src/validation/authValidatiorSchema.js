import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  full: Yup.string()
    .required('Full name is required')
    .max(60, 'Full name should not exceed 60 characters')
    .matches(/^[a-zA-Z ]+$/, 'Please enter a valid full name'),

  phone: Yup.number()
    .typeError('Phone number must be a number')
    .required('Please enter phone number'),

  email: Yup.string()
    .email('Invalid email address') // Check if the email is valid
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Email pattern
      'Invalid email address'
    )
    .max(50, 'Email cannot exceed 50 characters')
    .required('Email is required'),  // Ensure email is not empty

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters') // Minimum length of 8
    .max(20, 'Password cannot be longer than 20 characters') // Maximum length of 20
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // At least one uppercase letter
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // At least one lowercase letter
    .matches(/[0-9]/, 'Password must contain at least one number') // At least one number
    .matches(/[\W_]/, 'Password must contain at least one special character') // At least one special character
    .required('Password is required'), // Ensure password is not empty
});


export const signinValidationSchema = Yup.object().shape({
  email: Yup.string()
      .test('email-or-phone', 'Invalid email or phone number', (value) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          const phoneRegex = /^\d{10}$/;  
          return emailRegex.test(value) || phoneRegex.test(value);
      })
      .required('Email or Phone number is required'),  

  // password: Yup.string()
  //     .min(8, 'Password must be at least 8 characters')
  //     .max(20, 'Password cannot be longer than 20 characters')
  //     .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  //     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  //     .matches(/[0-9]/, 'Password must contain at least one number')
  //     .matches(/[\W_]/, 'Password must contain at least one special character')
  //     .required('Password is required'),
});



export const forgotPasswordSchema = Yup.object().shape({
    email:Yup.string()
    .email('Invalid email address') // Check if the email is valid
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Replace 'example.com' with your domain
        'Invalid email address'
    )
    .max(25)
    .required('Email is required'),  // Ensure email is not empty
});
export const createNewPasswordSchema = Yup.object().shape({
    password:Yup.string()
    .min(8, 'Password must be at least 8 characters')  // Minimum length of 8
    .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // At least one uppercase letter
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // At least one lowercase letter
    .matches(/[0-9]/, 'Password must contain at least one number')  // At least one number
    .matches(/[\W_]/, 'Password must contain at least one special character')  // At least one special character (e.g., !, @, #, etc.)
    .required('Password is required'),  // Ensure password is not empty
    confirmPassword:Yup.string()
    .min(8, 'Password must be at least 8 characters')  // Minimum length of 8
    .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // At least one uppercase letter
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // At least one lowercase letter
    .matches(/[0-9]/, 'Password must contain at least one number')  // At least one number
    .matches(/[\W_]/, 'Password must contain at least one special character')  // At least one special character (e.g., !, @, #, etc.)
    .oneOf([Yup.ref("password"), null], "confirm password must match password")
    .required('Password is required'),  // Ensure password is not empty
});