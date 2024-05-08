import express from "express";
//import {login} from "../controllers/authentication/login.js";
//import { signup } from "../controllers/authentication/signup.js";
//import { logger } from "../middleware/logger.js";
import { registerUser } from "../controllers/userController.js";
const userRouter = express.Router();


//authRouter.post("/login", login);
userRouter.post("/register",registerUser);
//authRouter.post("/changePassword", changePassword);
 

export default userRouter;
