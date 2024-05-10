import express from "express";
import { registerUser, loginUser,logout,getUser, loginStatus} from "../controllers/userController.js";
import protect from "../middleWare/authMiddleware.js";

const userRouter = express.Router();
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/logout",logout);
userRouter.get("/getuser",protect,getUser);
userRouter.get("/",loginStatus);

 

export default userRouter;