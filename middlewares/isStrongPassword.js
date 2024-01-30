import CustomError from "../utils/CustomError.js";
import asyncHandler from "../utils/asyncHandler.js";

const isStrongPassword = asyncHandler(async(req, _res, next) => {
    try {
        const { password } = req.body;

        // Define criteria for a strong password
        const minLength = 8;
        const minUppercase = 1;
        const minLowercase = 1;
        const minDigits = 1;
        const minSpecialChars = 1;
        const specialCharsRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

        // Check if the password meets the criteria
        if (!password || password.length < minLength) {
            throw new CustomError(`Password must be at least ${minLength} characters long`, 400);
        }

        if (!password.match(/[A-Z]/g) || password.match(/[A-Z]/g).length < minUppercase) {
            throw new CustomError(`Password must contain at least ${minUppercase} uppercase letter(s)`, 400);
        }

        if (!password.match(/[a-z]/g) || password.match(/[a-z]/g).length < minLowercase) {
            throw new CustomError(`Password must contain at least ${minLowercase} lowercase letter(s)`, 400);
        }

        if (!password.match(/[0-9]/g) || password.match(/[0-9]/g).length < minDigits) {
            throw new CustomError(`Password must contain at least ${minDigits} digit(s)`, 400);
        }

        if (!password.match(specialCharsRegex) || password.match(specialCharsRegex).length < minSpecialChars) {
            throw new CustomError(`Password must contain at least ${minSpecialChars} special character(s)`, 400);
        }

        // If the password is strong, move to the next middleware
        next();
    } catch (error) {
        next(error);
    }
});

export default isStrongPassword;