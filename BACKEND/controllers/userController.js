
import asyncHandler from "express-async-handler";
import {User} from "../models/userModel.js";
import jwt from 'jsonwebtoken';


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
};


const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    //Validation
    if(!email || !name || !password){
        res.status(400);
        throw new Error("PLease fill in all required fields");
    }
    if(password.length <6){
        res.status(400)
        throw new Error("password must be up to 6 characters");
    }
    //Check if user or email is alredy exist
    const userExist = await User.findOne({email})
    if (userExist){
        res.status(400);
        throw new Error("The email is already used"); 
    } 
   
    //Create a user
    const user = await User.create({
        name,
        email,
        password, 
    });

     //Generate Token
     const token = generateToken(user._id)
   //Send HTTP-only cookie 
   res.cookie("token", token,{
    path: "/", 
    httpOnly: true,
    expires: new Date(Date.now()+ 1000 * 86400),//1 Day
    sameSite: "none",
    secure: true
   })
 
    if (user){
        const {_id, name, email,phone, photo, bio} =user
        res.status(201).json({
            _id, name, email,phone, photo, bio, token, 
        })
    }else{
        res.status(400);
        throw new Error("An invalid user data");
    }
});

export { registerUser };


