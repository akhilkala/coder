import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  verified: boolean;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    validate:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  //TODO: Separate model lol
  solveList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  ],
  bio: {
    type: String,
  },
  github: {
    type: String,
  },
  // likedQuestions: [{}],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  friendRequests: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  friends: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model<IUser>("User", userSchema);
