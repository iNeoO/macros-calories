const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlimentSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  userId: { type: Schema.Types.ObjectId, ref:'users', required: true },
  quantity: { type: Number, required: true },
  kcal: { type: Number, required: true },
  carbohydrate: { type: Number, required: true },
  fat: { type: Number, required: true },
  protein: { type: Number, required: true },
  fiber: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

AlimentSchema.pre('findOneAndUpdate', function updateDate(next) {
  this.update({}, {
    '$set': { updated_at: new Date() },
  });
  next();
});

module.exports = mongoose.model('aliments', AlimentSchema);
