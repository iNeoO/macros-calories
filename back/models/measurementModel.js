const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeasurementSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref:'users', required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  breath: { type: Number, required: true },
  underBreath: { type: Number, required: true },
  abdomen: { type: Number, required: true },
  waist: { type: Number, required: true },
  butt: { type: Number, required: true },
  leftLeg: { type: Number, required: true },
  rightLeg: { type: Number, required: true },
  leftArm: { type: Number, required: true },
  rightArm: { type: Number, required: true },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

MeasurementSchema.pre('findOneAndUpdate', function updateDate(next) {
  this.update({}, {
    '$set': { updated_at: new Date() },
  });
  next();
});

module.exports = mongoose.model('measurements', MeasurementSchema);
