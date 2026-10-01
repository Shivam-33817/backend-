import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,

    }
})
const User = mongoose.model("user", userschema);
export default User