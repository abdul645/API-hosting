import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    ID: {
        type: Number,
        require: true,
        unique: true,
    },
    name : {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true,
    },
    password : {
        type : String,
        required: true 
    },
    confirmPassword: {
        type : String,
        required: true
    }
})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;