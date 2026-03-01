export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhoneNumber = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

export const validateForm = (formData, rules) => {
  const errors = {};
  Object.keys(rules).forEach((field) => {
    if (!rules[field](formData[field])) {
      errors[field] = `${field} is invalid`;
    }
  });
  return errors;
};
