const Validator = require("validator");
const isEmpty = require("is-empty");


module.exports = function validateRegisterInput(data) {

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.user_name = !isEmpty(data.user_name) ? data.user_name : "";
    data.user_email = !isEmpty(data.user_email) ? data.user_email : "";
    data.user_pass = !isEmpty(data.user_pass) ? data.user_pass : "";
    data.user_pass2 = !isEmpty(data.user_pass2) ? data.user_pass2 : "";

    // Name checks
    if (Validator.isEmpty(data.user_name)) {
        errors.user_name = "Name is required";
    }

    // Email checks
    if (Validator.isEmpty(data.user_email)) {
        errors.user_email = "Email is required";
    } else if (!Validator.isEmail(data.user_email)) {
        errors.user_email = "Email is invalid";
    }
    
    // Password checks
    if (Validator.isEmpty(data.user_pass)) {
        errors.user_pass = "Password is required";
    }
    if (Validator.isEmpty(data.user_pass2)) {
        errors.user_pass2 = "Confirm pass field is required";
    }
    if (!Validator.isLength(data.user_pass, { min: 6, max: 30 })) {
        errors.user_pass = "Password must be at least 6 characters";
    }
    if (!Validator.equals(data.user_pass, data.user_pass2)) {
        errors.user_pass2 = "Passwords must match";
    }

    // isValid = true if errors object is empty :)
    return {
        errors,
        isValid: isEmpty(errors)
    };
};