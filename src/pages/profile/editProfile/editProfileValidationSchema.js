import * as yup from "yup";

//const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const profileValidationSchema = yup.object({
    firstName: yup
        .string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters")
        .max(30,"First name must be less then 30 characters"),
    lastName: yup
        .string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters")
        .max(30,"Last name must be less then 30 characters"),
    email:yup.string()
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
    .notRequired(),  
        
});
