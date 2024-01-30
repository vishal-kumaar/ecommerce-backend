import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isValidPhoneNumber = asyncHandler(async(req, _res, next) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber){
        next();
    }

    try {
        // Regular expression for common phone number formats
        const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

        if (!phoneRegex.test(phoneNumber)) {
            throw new CustomError("Invalid phone number format", 400);
        }

        // If phone number is valid, move to the next middleware
        next();
    } catch (error) {
        next(error);
    }
});

export default isValidPhoneNumber;