
import asyncHandler from "express-async-handler";
import {User} from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



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

//Login User
const loginUser = asyncHandler(async(req, res) => {
 const {email, password} = req.body
//Validate request

if(!email || !password){
    res.status(400);
    throw new Error("PLease add an email and password");  
}
//Check if a user exist
const user = await User.findOne({email})
if(!user){
    res.status(400);
    throw new Error("User not fiund please signup");  
}
//User exist, mow lets check if passwoed is correct
const passwordIsCorrect = await bcrypt.compare(password, user.password)

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

 
if(user && passwordIsCorrect){
    const {_id, name, email,phone, photo, bio} =user
    res.status(200).json({
        _id, name, email,phone, photo, bio,token
    });

}else{
    res.status(400);
    throw new Error("Invalid email or password  ");   
}
});

//Logout the user
const logout = asyncHandler(async (req, res) =>{
//Send HTTP-only cookie 
res.cookie("token", " ",{
    path: "/", 
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true
   })
  return res.status(200).json({message: "Succesfully logged Out"})
});

//Get user Data
const getUser = asyncHandler(async(req, res)=>{
const user = await User.findById(req.user._id)
if(user){
    const {_id, name, email,phone, photo, bio} =user;
    res.status(201).json({
        _id, name, email,phone, photo, bio, token, 
    });
}else{
    res.status(400);
    throw new Error("User not found");    
}

});

//Get Lodin Status
const loginStatus = asyncHandler(async(req, res) =>{
res.send("status");
});

export { registerUser, loginUser,logout,getUser, loginStatus };


