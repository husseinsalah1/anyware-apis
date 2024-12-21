import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Document, Schema, model } from "mongoose";

const saltrounds = 10;
const JWT_SECRET = process.env.JWT_SECRET || "anyware";

export enum ROLE {
  USER = "USER",
  TEACHER = "TEACHER",
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  generateAuthToken(): Promise<string>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "USER", enum: ROLE },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, saltrounds);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const payload = {
    _id: user._id.toString(),
    role: user.role,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  user.token = token;
  await user.save();
  return token;
};
export const userModel = model<IUser>("users", userSchema);
