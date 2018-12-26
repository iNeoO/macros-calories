const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
  password: { type: String, required: true, select: false },
  sexe: { type: String, required: true, enum:[ 'male', 'female'] },
  activityType: {
    type: { type: String, enum: [
      'normalActivity',
      'weekActivity',
      'lightActivity',
      'moderateActivity',
      'hightActivity',
      'extremActivity',
      'custom',
    ] },
    variation: { type: Number, default: 0 },
    objKcal: { type: Number, default: 0 },
  },
  nutriments: {
    carbohydrate: { type: Number },
    fat: { type: Number },
    protein: { type: Number },
    fiber: { type: Number },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

UserSchema.pre('save', function hashPassword(next) {
  bcrypt.hash(this.password, stage.saltingRounds, (err, hash) => {
    if (err) {
      console.log('Error hashing password for user', this.name);
      next(err);
    } else {
      this.password = hash;
      next();
    }
  });
});

UserSchema.pre('findOneAndUpdate', function updateDate(next) {
  this.update({}, {
    '$set': { updated_at: new Date() },
  });
  next();
});

module.exports = mongoose.model('users', UserSchema);
