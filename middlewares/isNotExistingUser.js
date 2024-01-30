import User from "../schemas/user.schema";
import asyncHandler from "../utils/asyncHandler";
import CustomError from "../utils/CustomError";

const isExistingUser = asyncHandler(async (req, _res, next) => {
    try {
        const { email } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new CustomError("User already exists", 409);
        }

        // If the user does not exist, move to the next middleware
        next();
    } catch (error) {
        next(error);
    }
});

export default isExistingUser;