import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
//import authRouter from "./src/routes/authenticationRoute.js";
//import carRouter from "./src/routes/carRoute.js";


const app =express();
app.use(bodyParser.json());
app.use(cors())
app.use(morgan("dev"))


//app.use('/api/v1/auth', authRouter);
//app.use('/api/v1/car', carRouter);



let port = process.env.PORT || 5000; 

 

console.log(process.env.DB_CONNECTION_DEV);
mongoose.connect(process.env.DB_CONNECTION_PROD).then((res) =>{
  console.log("Database connected");
});
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});