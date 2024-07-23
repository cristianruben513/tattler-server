import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
  city: String,
  street: String,
  coord: {
    type: [Number],
    index: '2dsphere'
  },
});

const restaurantSchema = new Schema({
  address: addressSchema,
  scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  photo: String,
  category: String,
  name: String
}, {
  timestamps: true
});

export default mongoose.model('Restaurant', restaurantSchema);