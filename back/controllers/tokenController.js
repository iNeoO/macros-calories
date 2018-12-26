const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Puid = require('puid');
const { callBackError } = require('../helpers/callBackHelper.js');
const Token = mongoose.model('tokens');
const User = mongoose.model('users');

exports.get_token = (req, res) => {
  const result = {};
  const status = 200;
  Token.findOne({ token: req.params.token }, (err, token) => {
    if (!err) {
      const today = new Date();
      if (token &&
        token.valid &&
        token.expire_at &&
        today.getTime() < token.expire_at.getTime()) {
        result.status = status;
        result.data = token;
        res.status(status).send(result);
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
      result.status = 404;
      result.error = 'Token not found';
      res.status(status).send(result);
    }
  });
};

exports.post_auth = (req, res) => {
  const result = {};
  let status = 200;
  const username = req.body.username;
  User.findOne({ username }, (err, user) => {
    if (!err && user) {
      const password = req.body.password;
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const puid = new Puid();
          const newToken = puid.generate();
          const date = new Date();
          date.setDate(date.getDate() + 8);
          const tokenObject = {
            valid: true,
            token: newToken,
            expire_at: date,
            userId: user._id,
          };
          const new_token = new Token(tokenObject);
          new_token.save((err, token) => {
            if (!err) {
              result.status = status;
              result.data = token;
            } else {
              status = 500;
              result.status = 500;
              result.error = err;
            }
            res.status(status).send(result);
          });
        } else {
          callBackError(res, 401, 'wrong credentials');
        }
      });
    } else {
      callBackError(res, 401, 'wrong credentials');
    }
  }).select('+password');
};


exports.delete_token = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Token.remove({
      token: req.params.token,
      userId: req.local.userId,
    }, (err, token) => {
      if (!err) {
        result.status = status;
        result.data = token;
      } else {
        result.status = 404;
        result.error = 'Token not found';
      }
      res.status(status).send(result);
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};
