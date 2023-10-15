import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model(
  "User",
  new Schema({
    email: {
      type: String,
      required: true, // NOT NULL
      validate: {
        validator: isEmail,
        message: "Email is in incorrect format",
      },
    },
    password: {
      //hashed/encrypted password
      type: String,
      required: true,
      // validate ??
    },
    balance: { type: Number, required: true },
  })
);
