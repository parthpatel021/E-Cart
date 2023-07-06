import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT  from "jsonwebtoken";

export const registerController = async (req, res) => {
    try{
        const {name, email, password, phone, address} = req.body;

        // Validation
        if(!name || !email || !password || !phone || !address){
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

        const user = await new userModel({ name, email, password:hashedPassword, phone, address}).save();

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

// Test Controller
export const testController = (req, res) => {
    res.send('protected route');
}; 