export const passwordValidation = {
  required: 'Password is required!',
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"$%^&@]).*$/,
    message: 'pattern',
  },
};

export const emailValidation = {
  required: 'Email is required!',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Enter your valid email!',
  },
};

export const repeatPasswordValidation = (getPassword: () => string) => ({
  required: 'Repeat password is required!',
  validate: (value: string) => value === getPassword() || 'The passwords do not match',
});

export const termsValidation = {
  required: 'Accept terms and conditions!',
};

export const countryRestrictionValidation = {
  required: 'Accept country restriction!',
};

export const phoneNumberValidation = (getPattern: () => string) => ({
  required: 'Phone number is required!',
  minLength: {
    value: 5,
    message: 'Phone number must be at least 5 digits',
  },
  validate: (value: string) =>
    !!new RegExp(`^${getPattern().replace(/\\s/g, '')}$`).test(value) ||
    'The phone number is invalid',
});

export const nameValidation = {
  required: 'Field is required!',
  minLength: {
    value: 2,
    message: 'Name must be at least 2 characters',
  },
  pattern: {
    value: /^[A-Za-z]+$/,
    message: 'Invalid name, only latin letters are allowed',
  },
};

export const imageValidation = {
  // required: 'Avatar is required!'
};

export const countryValidation = {
  required: 'Country established is required!',
};

export const addressValidation = {
  required: 'Address is required!',
};

export const stateValidation = {
  // required: 'State is required!'
};

export const nationalityValidation = {
  required: 'Nationality is required!',
};

export const postalCodeValidation = {
  required: 'Postal code is required!',
};
