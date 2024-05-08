
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add a name"]
    },
    email: {  
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    trim: true,
    match: [
        /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
"Please enter a valid email"

    ]
    },
    password:  {
        type: String,
        required: [true, "please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
        maxLength: [23, "Password must be more than 23 characters"],
    },
   photo:{
        type: String,
        required: [true, "please add a photo"],
        default: "https://tse1.mm.bing.net/th?id=OIP.OONzqxQcoTwq0WsIEp_EmQHaHC&pid=Api&P=0&h=220"
   },
   phone:{
    type: String,
    default: "+250"
},
bio:{
    type: String,
    maxLength: [250, "Password must be more than 250 characters"],
    default: "bio"
},
},
{
    timestamps: true,
}
);
export const User =mongoose.model("User", userSchema);