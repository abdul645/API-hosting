import mongoose from "mongoose";

const ContactSchema = mongoose.connect({
    Name : {
        type : String,
        required: true
    },
    Mail: {
        type : String,
        required: true,
    },
    Message : {
        type : String,
        required: true 
    }
})

const contactUsModel = mongoose.model('contactUS', ContactSchema);

export default contactUsModel;