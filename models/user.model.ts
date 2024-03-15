import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetCode: { type: String, default: undefined },
    resetCodeExpiry: { type: Date, default: undefined },
    resetCodeVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);

UserSchema.pre('save',async function (next){
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

export const User = mongoose.model("User", UserSchema);
