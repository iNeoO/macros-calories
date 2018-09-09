const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  weight: { type: Number, required: true },
  old: { type: Number, required: true },
  height: { type: Number, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, {
  versionKey: false,
});

module.exports = mongoose.model('users', UserSchema);
