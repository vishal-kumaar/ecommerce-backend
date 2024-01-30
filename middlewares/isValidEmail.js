import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";

const validateEmail = asyncHandler(async(req, _res, next) => {
    try {
        const { email } = req.body;

        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new CustomError("Invalid email format", 400);
        }

        // If email is valid, move to the next middleware
        next();
    } catch (error) {
        next(error);
    }
});

export default validateEmail;