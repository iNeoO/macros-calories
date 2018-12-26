const mongoose = require('mongoose');
const { callBackError } = require('../helpers/callBackHelper.js');
const Token = mongoose.model('tokens');

const isAuthenticated = (req, res, next) => {
  if (req.headers.authorization) {
    const authorization = req.headers.authorization;
    Token.findOne({ token: authorization }, (err, token) => {
      if (!err) {
        const today = new Date();
        if (token &&
          token.valid &&
          token.expire_at &&
          today.getTime() < token.expire_at.getTime()) {
          req.local = {
            userId: token.userId,
          };
          return next();
        } else if (token.valid) {
          Token.findOneAndUpdate({
            _id: token._id,
          }, {
            '$set': { valid: false },
          }, (err) => {
            if (!err) {
              callBackError(res, 403, 'Token is expired');
            } else {
              callBackError(res, 500, 'Something went wrong');
            }
          });
        }
      } else {
        callBackError(res, 401, 'You need to be auth');
      }
    });
  } else {
    callBackError(res, 401, 'You need to be auth');
  }
};

module.exports = isAuthenticated;
