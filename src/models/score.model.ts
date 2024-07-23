import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
}, {
  timestamps: true
})

export default mongoose.model('Score', scoreSchema)