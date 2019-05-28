const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.user_email = !isEmpty(data.user_email) ? data.user_email : "";
    data.user_pass = !isEmpty(data.user_pass) ? data.user_pass : "";

    // Email checks
    if (Validator.isEmpty(data.user_email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.user_email)) {
        errors.email = "Email is invalid";
    }

    // Password checks
    if (Validator.isEmpty(data.user_pass)) {
        errors.password = "Password field is required";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};