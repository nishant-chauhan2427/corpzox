import * as Yup from "yup";


// Validation Schema
export const registrationSchema = Yup.object().shape({
  registration: Yup.object().shape({
    typeOfBusiness: Yup.string()
      .required("Business Type is required.")
      .min(3, "Business Type must be at least 3 characters.")
      .max(50,"Business Type must be atmost 50 characters."),
    businessName: Yup.string()
      .required("Business Name is required.")
      .min(3, "Business Name must be at least 3 characters.")
      .max(50,"Business Name must be atmost 50 characters."),
    cinNumber: Yup.string()
      .required("CIN No. is required.")
      .matches(/^[A-Z0-9]{21}$/, "CIN No. must be a valid 21-character code."), // Example pattern for CIN
    roleOfCompany: Yup.number()
      .required("Role of the Company is required.")
      .oneOf([1, 0], "Invalid Role of the Company value."),
    yearOfStablish: Yup.date()
      .required("Year of Establishment is required.")
      .min(new Date(1900, 0, 1), "Year cannot be before 1900.")
      .max(new Date(), "Year cannot be in the future."),
    headQuarterLocation: Yup.string()
      .required("Headquarter Location is required.")
      .min(3, "Location must be at least 3 characters.")
      .max(50,"Location must be atmost 50 characters."),
    industry: Yup.string()
      .required("Industry Type is required."),
    subIndustry: Yup.string()
      .required("Sub Industry Type is required."),
    sizeOfCompany: Yup.number()
      .required("Size of the Company is required.")
      .min(1, "Size must be at least 1 employee.")
      .max(100000, "Size cannot exceed 100,000 employees."),
    funded: Yup.string()
      .required("Funding Status is required.")
      .oneOf(["funded", "bootstrap"], "Invalid funding status."),
  }),
});


// Address Details Schema
export const addressSchema = Yup.object().shape({
  address: Yup.object().shape({
      businessAddressL1: Yup.string().
      required("Line 1 is required")
      .min(3, "Line 1 must be at least 3 characters.")
      .max(50, "Line 1 must be at most 50 characters."),
      businessAddressL2: Yup.string().
      required("Line 2 is required")
      .min(3, "Line 2 must be at least 3 characters.")
      .max(50, "Line 2 must be at most 50 characters."),
      businessAddressPin: Yup.number()
      .required("Pin is required")
      .test('len', 'Must be exactly 6 characters', val => val.toString().length === 6),
      businessAddressCity: Yup.string().required("City is required"),
      businessAddressState: Yup.string()
      .required("State is required"),
      communicationAddressL1: Yup.string()
      .required("Line 1 is required")
      .min(3, "Line 1 must be at least 3 characters.")
      .max(50, "Line 1 must be at most 50 characters."),
      communicationAddressL2: Yup.string()
      .required("Line 2 is required")
      .min(3, "Line 2 must be at least 3 characters.")
      .max(50, "Line 2 must be at most 50 characters."),
      communicationAddressPin: Yup.number()
      .required("PIN Code is required")
      .test('len', 'Must be exactly 6 characters', val => val.toString().length === 6),
      communicationAddressCity: Yup.string()
      .required("City is required"),
      communicationAddressState: Yup.string()
      .required("State is required"),
  }),
});

// Financial Details Schema
export const financialSchema = Yup.object().shape({
  financial: Yup.object().shape({
      capital: Yup.number()
        .required('Capital is required')
        .positive('Capital must be a positive number')
        .test('len', 'Must be between 6 to 10 characters', val => val.toString().length >= 6 &&  val.toString().length <= 10)
        .typeError('Capital must be a number'),
      revenue: Yup.number()
        .required('Revenue is required')
        .positive('Revenue must be a positive number')
        .test('len', 'Must be between 6 to 10 characters', val => val.toString().length >= 6 &&  val.toString().length <= 10)
        .typeError('Revenue must be a number'),
      profit: Yup.number()
        .required('Profit is required')
        .positive('Profit must be a positive number')
        .test('len', 'Must be between 6 to 10 characters', val => val.toString().length >= 6 &&  val.toString().length <= 10)
        .typeError('Profit must be a number'),
  }),
});

// KYC Details Schema
export const kycSchema = Yup.object().shape({
  kyc: Yup.object().shape({
      kycUser: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(20, 'Username must be at most 20 characters'),
      id: Yup.string()
        .required('ID proof No. is required')
        .matches(/^[A-Za-z0-9]+$/, 'ID proof No. must be alphanumeric')
        .min(11, 'ID proof No. must be at least 11 characters')
        .max(15, 'ID proof No. must be at most 15 characters'),

      addressProof: Yup.string()
        .required('Address Proof No. is required')
        .matches(/^[A-Za-z0-9]+$/, 'Address Proof No. must be alphanumeric')
        .min(3, "Address must be at least 3 characters.")
        .max(30, "Address must be at most 30 characters."),
  }),
});

// Funding Details Schema
export const fundingSchema = Yup.object().shape({
  funding: Yup.object().shape({
      lookingForFunding: Yup.number()
        .required('Funding requirement is required')
        .oneOf([1, 0], 'Please select a valid option'), // Validate 'Yes' or 'No'
      existingBusinessName: Yup.number()
        .required('Existing business status is required')
        .oneOf([1, 0], 'Please select a valid option'), // Validate 'Active' or 'Inactive'
  }),
});