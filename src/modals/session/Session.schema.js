import mongoose from 'mongoose';

const sessionSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      default: '',
    },
    token: {
      type: String,
      required: true,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('session', sessionSchema);
