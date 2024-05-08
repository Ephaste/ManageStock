
import asyncHandler from "express-async-handler";

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    //Validation
    if(!name || !password || !password){
        res.status(400)
        throw new Error("PLease fill in all required fields")
    }
});

export { registerUser };


