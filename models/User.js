const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name: {
        type: String,
        required: "Name is required!",
        trim: true
    },
    user_email: {
        type: String,
        required: "Email is required!"
    },
    user_pass: {
        type: String,
        required: "Password is required!",
        trim: true
    },
	date_created: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;