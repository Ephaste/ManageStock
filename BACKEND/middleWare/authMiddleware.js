
import asyncHandler from "express-async-handler";
import {User} from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const protect =asyncHandler(async(req, res, next)=>{
try {
    const token = req.cookies.token
    if(!token){
        res.status(401)
        throw new Error ("Not authorised, please login")
    }
    //Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    //Get the usser id from token
     user = await User.findById(verified.id).select("-password")
    if(!user){
        res.status(401)
        throw new Error ("User not found")  
    }
    req.user = user
    next()
} catch (error) {
    res.status(401)
    throw new Error ("Not authorised, please login") 
}
});
 export default protect; 