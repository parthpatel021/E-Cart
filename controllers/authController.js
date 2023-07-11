import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT  from "jsonwebtoken";

export const registerController = async (req, res) => {
    try{
        const {name, email, password, phone, address, answer} = req.body;

        // Validation
        if(!name || !email || !password || !phone || !address || !answer){
            return res.send({ message : "Invalid Input"})
        }

        // check for exisiting user
        const exisitingUser = await userModel.findOne({email});

        if(exisitingUser){
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login",
            })
        }

        // register User
        const hashedPassword = await hashPassword(password);

        const user = await new userModel({ name, email, password:hashedPassword, phone, address, answer}).save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            success : false,
            message: "Error in registation",
            err
        })
    }
};

// Login POST
export const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;

        // Validation
        if(!email || !password ){
            return res.send({ message : "Invalid Input"})
        }

        // check  user
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(404).send({
                success: true,
                message: "Email is not registerd",
            })
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        // token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });

    }catch(err){
        console.log(err);
        res.status(500).send({
            success : false,
            message: "Error in Login",
            err
        })
    }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
    try{
        const {email, answer, newPassword} = req.body;
        if(!email || !answer || !newPassword){
            return res.send({ message : "Invalid Input"})
        }

        // Check
        const user = await userModel.findOne({ email, answer});

        // Validation
        if(!user){
            res.status(404).send({
                success: false,
                message: "Invalid Email or Answer.",
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed});
        res.status(200).send({
            success: true,
            message: "password reset successfully",
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            err,
        })
    }
}

// Test Controller
export const testController = (req, res) => {
    res.send('protected route');
}; 