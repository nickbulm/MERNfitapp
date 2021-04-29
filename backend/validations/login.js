const Validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};

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

  return {
    errors,
    isValid: true,
  };
};