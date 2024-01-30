import User from "../../schemas/user.schema.js"
import asyncHandler from "../../utils/asyncHandler.js"
import CustomError from "../../utils/CustomError.js"

const signup = asyncHandler(async(req, res) => {
    const {name, email, phoneNumber, password} = req.body;

    if (!name){
        throw new CustomError("Name is required", 400)
    }

    if(!phoneNumber){
        phoneNumber = undefined;
    }

    const user = await User.create({
        name,
        email,
        phoneNumber,
        password
    });

    user.password = undefined;
    
    res.status(200).json({
        success: true,
        message: "User created successfully",
        user
    });
})

export default signup;