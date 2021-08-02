import mongoose, { Document } from 'mongoose';

export interface IProblem extends Document {
  name: string;
  link: string;
}

const problemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  link: {
    type: String,
    index: true,
  },
});

export default mongoose.model<IProblem>('Problem', problemSchema);
