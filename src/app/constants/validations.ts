export const required = (fieldName: string) => `${fieldName} is Required`;

export const inValid = (fieldName: string) => `Please Enter Valid ${fieldName}`;

export const minDigitsRequired = (fieldName: string, min: number) =>
  `${fieldName} Should be ${min} digits`;

export const maxDigitsRequired = (fieldName: string, max: number) =>
  `${fieldName} has minimum ${max} digits`;

export const userDetailsValidation = {
  firstName: {
    required: required('First Name'),
  },
  lastName: {
    required: required('Last Name'),
  },
  email: {
    required: required('Email Id'),
    email: inValid('Email Id'),
  },
  phoneNo: {
    required: required('Phone No'),
    minlength: minDigitsRequired('Phone No', 10),
  },
};

export const userContactInfoValidation = {
  address: {
    required: required('Address'),
  },
  street: {
    required: required('Street'),
  },
  city: {
    required: required('City'),
  },
  state: {
    required: required('State'),
  },
  pinCode: {
    required: required('Pin Code'),
  },
};

export const leaveDetailsValidation = {
  typeOfLeave: {
    required: required('Type Of Leave'),
  },
  comment: {
    required: required('Comment is required'),
  },
  startDate: {
    required: required('Start Date'),
  },
  endDate: {
    required: required('End Date'),
  },
};
