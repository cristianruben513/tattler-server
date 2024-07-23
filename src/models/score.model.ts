import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
})

export default mongoose.model('Score', scoreSchema)