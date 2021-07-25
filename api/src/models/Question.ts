import mongoose, { Document } from 'mongoose';

export interface IQuestion extends Document {}

const questionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
    link: {
      type: String,
    },
    description: {
      type: String,
    },
    shares: {
      type: Number,
      default: 0,
    },
    // likes: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>('Question', questionSchema);
