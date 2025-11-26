import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    sid: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
    },
    degree: {
      type: String,
      required: true,
      maxlength: 50,
    },
    graduation: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'students',
  }
);

export const Student = mongoose.model('Student', studentSchema);
