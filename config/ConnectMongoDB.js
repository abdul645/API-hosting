import mongoose from 'mongoose';

const ConnectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connection to MongoDB");
    } catch (error) {
        console.log("Error connecting  to MongoDB", error.message);
    }
}

export default ConnectDB;