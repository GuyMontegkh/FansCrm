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
