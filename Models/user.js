const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    Login_code: String
})

const User = mongoose.model("User", UserSchema, "Users")

module.exports = {User}