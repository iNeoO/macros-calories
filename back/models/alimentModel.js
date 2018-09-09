const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId },
  quantity: { type: Number, required: true },
  kcal: { type: Number, required: true },
  carbohydrate: { type: Number, required: true },
  fat: { type: Number, required: true },
  protein: { type: Number, required: true },
  fibre: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

module.exports = mongoose.model('users', UserSchema);
