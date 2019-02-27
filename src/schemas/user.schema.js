import mongoose from "mongoose";
import mongoErrorHandler from "./mongoErrorHandler";

export const SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME = "User must have a name.";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, SUBJECT_SCHEMA_VALIDATION_MESSAGE_NAME],
    unique: true
  },
  avatar: String // TODO: Add default avatar
});

userSchema.post("save", mongoErrorHandler);
userSchema.post("update", mongoErrorHandler);
userSchema.post("findOneAndUpdate", mongoErrorHandler);
userSchema.post("deleteOne", mongoErrorHandler);

export const UserSchema = mongoose.model("user", userSchema);
