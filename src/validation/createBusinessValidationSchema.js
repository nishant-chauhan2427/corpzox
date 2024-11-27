import * as Yup from "yup";


// Validation Schema
export const registrationSchema = Yup.object().shape({
  registration: Yup.object().shape({
    typeOfBusiness: Yup.string()
      .required("Business Type is required.")
      .min(3, "Business Type must be at least 3 characters."),
    businessName: Yup.string()
      .required("Business Name is required.")
      .min(3, "Business Name must be at least 3 characters."),
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
      .min(3, "Location must be at least 3 characters."),
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
    businessAddress: Yup.object().shape({
      businessAddressL1: Yup.string().required("Line 1 is required"),
      businessAddressL2: Yup.string().required("Line 2 is required"),
      businessAddressPin: Yup.string().required("PIN Code is required"),
      businessAddressCity: Yup.string().required("City is required"),
      businessAddressState: Yup.string().required("State is required"),
    }),
    communicationAddress: Yup.object().shape({
      communicationAddressL1: Yup.string().required("Line 1 is required"),
      communicationAddressL2: Yup.string().required("Line 2 is required"),
      communicationAddressPin: Yup.string().required("PIN Code is required"),
      communicationAddressCity: Yup.string().required("City is required"),
      communicationAddressState: Yup.string().required("State is required"),
    }),
  }),
});

// Financial Details Schema
export const financialSchema = Yup.object().shape({
  financial: Yup.object().shape({
    financialDetails: Yup.object().shape({
      capital: Yup.number()
        .required('Capital is required')
        .positive('Capital must be a positive number')
        .typeError('Capital must be a number'),
      revenue: Yup.number()
        .required('Revenue is required')
        .positive('Revenue must be a positive number')
        .typeError('Revenue must be a number'),
      profit: Yup.number()
        .required('Profit is required')
        .positive('Profit must be a positive number')
        .typeError('Profit must be a number'),
    }),
  }),
});

// KYC Details Schema
export const kycSchema = Yup.object().shape({
  kyc: Yup.object().shape({
    kycDetails: Yup.object().shape({
      kycUser: Yup.string()
        .required('Username is required')
        .min(4, 'Username must be at least 4 characters'),
      id: Yup.string()
        .required('ID proof No. is required')
        .matches(/^[A-Za-z0-9]+$/, 'ID proof No. must be alphanumeric'),
      addressProof: Yup.string()
        .required('Address Proof No. is required')
        .matches(/^[A-Za-z0-9]+$/, 'Address Proof No. must be alphanumeric'),
    }),
  }),
});

// Funding Details Schema
export const fundingSchema = Yup.object().shape({
  funding: Yup.object().shape({
    fundingRequirement: Yup.object().shape({
      lookingForFunding: Yup.number()
        .required('Funding requirement is required')
        .oneOf([1, 0], 'Please select a valid option'), // Validate 'Yes' or 'No'
      existingBusinessName: Yup.number()
        .required('Existing business status is required')
        .oneOf([1, 0], 'Please select a valid option'), // Validate 'Active' or 'Inactive'
    }),
  }),
});