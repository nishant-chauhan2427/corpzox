import * as yup from "yup";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const profileValidationSchema = yup.object({
    firstName: yup
        .string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: yup
        .string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
    
});
