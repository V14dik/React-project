export const validateRequeired = (value) => {
  value = value.trim();
  if (value) {
    return true;
  }
  return false;
};

export const validateMinLength = (value, minLength) => {
  value = value.trim();
  if (value.length >= minLength) {
    return true;
  }
  return false;
};

export const isRepeatPassword = (passwordValue, confirmPasswordValue) => {
  passwordValue = passwordValue.trim();
  if (passwordValue === confirmPasswordValue) {
    return true;
  }
  return false;
};

export const validateEmail = (email) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
  return pattern.test(String(email).toLowerCase());
  // return String(email)
  //   .toLowerCase()
  //   .match(
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //   );
};
