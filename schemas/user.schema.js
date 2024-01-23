import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrpyt from "bcryptjs";
import JWT from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index.js";

// Create the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, "Name is required"],
      maxLength: [50, "Name must be less than 50 characters"],
    },
    email: {
      type: String,
      requried: [true, "Email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      requried: [true, "Password is required"],
      minLength: [8, "Password must be atleast of 8 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(AuthRoles),
      default: AuthRoles.USER,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypt password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrpyt.hash(this.password, 10);
  }
  next();
});

// Add more features directly to your schema
userSchema.methods = {
  // Compare password
  comparePassword: async function (enteredPassword) {
    return await bcrpyt.compare(enteredPassword, this.password);
  },

  // Generate JWT TOKEN
  getJwtToken: function () {
    return JWT.sign(
      {
        _id: this._id,
        role: this.role,
      },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRY,
      }
    );
  },

  // Generate forgot password token
  generateForgotPasswordToken: function () {
    const forgotToken = crypto.randomBytes(20).toString("hex");

    // Step 1 - Save to DB
    this.forgotPasswordToken = crypto
      .createHash("sha256")
      .update(forgotToken)
      .digest("hex");

    this.forgotPasswordExpiry = Date.now() + 20 + 60 * 1000;

    // Step 2 - Return values to user
    return forgotToken;
  },
};

// Export the user schema
export default mongoose.model("User", userSchema);