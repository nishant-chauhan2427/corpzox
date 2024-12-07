import * as Yup from "yup";
export const signUpValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('please enter your first name').max(30).matches(/^[a-zA-Z ]+$/,'please enter valid first name'),
    lastName: Yup.string().required('please enter your last name').max(30).matches(/^[a-zA-Z ]+$/,'please enter valid last name'),
    phone:Yup.number('phone number must be a number').required('please enter phone number'),
    email:Yup.string()
    .email('Invalid email address') // Check if the email is valid
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,  // Replace 'example.com' with your domain
        'Invalid email address'
    )
    .max(50)
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



export const signinValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')  // Ensure it is a valid email if provided
    .test('email-or-phone', 'Either email or phone must be provided', function(value) {
      const { phone } = this.parent;  // Access sibling field (phone)
      
      // If both email and phone are empty, show error
      if (!value && !phone) {
        return this.createError({ message: 'Email or Phone number is required' });
      }
      
      // Check if it's a valid email or a valid phone number
      if (value && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        return this.createError({ message: 'Please provide a valid email' });
      }
      
      return true;
    })
    .notRequired(),  // Email is not required if phone is provided

  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')  // Validate phone number
    .test('email-or-phone', 'Either email or phone must be provided', function(value) {
      const { email } = this.parent;  // Access sibling field (email)
      
      // If both email and phone are empty, show error
      if (!value && !email) {
        return this.createError({ message: 'Email or Phone number is required' });
      }
      
      return true;
    })
    .notRequired(),  // Phone is not required if email is provided

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')  // Minimum length of 8
    .max(20, 'Password cannot be longer than 20 characters')  // Maximum length of 20
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')  // At least one uppercase letter
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')  // At least one lowercase letter
    .matches(/[0-9]/, 'Password must contain at least one number')  // At least one number
    .matches(/[\W_]/, 'Password must contain at least one special character')  // Special character (e.g., !, @, #, etc.)
    .required('Password is required'),  // Password required
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