import UserModel from '../models/UsersModel.js';


// sign up
export const SignupController = async (req, res) => {
    try {
        const { ID, name, email, password, confirmPassword } = req.body;
        console.log("Received signup request:", req.body);

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already existing' });
        }

        const newUser = new UserModel({ ID, name, email, password, confirmPassword });
        const finalSubmit = await newUser.save();
        res.status(201).send(finalSubmit);
        // res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });

    }
}

// sign in
export const SignInController = async (req, res) =>{
    
    try {
        const {email, password} = req.body;
        console.log("Sign in", req.body);

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const check = await UserModel.findOne({email});
        
        if(check && check.password === password){
            console.log("Login Successfully!");
            
            return res.status(200).json({ message: "Login successful" });

        }else{
            return res.json("Wrong password or user not found")
        }
               
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


// Get all uers
export const getAllUsers = async (req, res) =>{
    try {        
        const AllUsers = await UserModel.find({}).sort("ID");
        res.send(AllUsers);
    } catch (error) {
        res.status(400).send(error);
        
    }
} 


// Get individual user by id 
export const getIndividualUser = async (req, res) =>{
    try {        
        const _id = req.params.id;                             //⬇️ this _id should match with the mongodb _id
        const IndividualUsers = await UserModel.findById({_id: _id});
        res.send(IndividualUsers);                       //⬆️ 
    } catch (error) {        //variable name and this should matCH  
        res.status(400).send(error);
        
    }
}


//  update user by id
export const UpdateUser = async (req, res) =>{
    try {        
        const _id = req.params.id;                                 
        const UpdateUsers = await UserModel.findByIdAndUpdate(_id, req.body, {
            new: true // will update immediately 
        });
        res.send(UpdateUsers);
    } catch (error) {       
        res.status(500).send(error);
        
    }
}



export const DeleteUser = async (req, res) =>{
    try {        
        const _id = req.params.id;                                 
        const DeleteUsers = await UserModel.findByIdAndDelete(_id);
        res.send(DeleteUsers);
    } catch (error) {       
        res.status(400).send(error);
        
    }
}