const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  token: { type: String, default: '' },
  userId: { type: Schema.Types.ObjectId, ref:'users', required: true },
  valid: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  expire_at: { type: Date },
}, {
  versionKey: false,
});

module.exports = mongoose.model('tokens', TokenSchema);
