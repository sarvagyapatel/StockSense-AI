import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
