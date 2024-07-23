import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true
})

export default mongoose.model('Comment', commentSchema)