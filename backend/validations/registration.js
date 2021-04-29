const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};
 
  // Name checks
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "Firstname field is required";
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Lastname field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email_address)) {
    errors.email_address = "Email field is required";
  } else if (!Validator.isEmail(data.email_address)) {
    errors.email_address = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: true,
  };
};