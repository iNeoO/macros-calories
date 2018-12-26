const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { callBackError } = require('../helpers/callBackHelper.js');
const User = mongoose.model('users');

const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

exports.post_user = (req, res) => {
  const result = {};
  const status = 200;
  const new_user = new User(req.body);
  new_user.save((err, user) => {
    if (!err) {
      result.status = status;
      result.data = user;
      res.status(status).send(result);
    } else {
      callBackError(res, 500, err);
    }
  });
};

exports.get_user = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    User.findById(req.local.userId, (err, user) => {
      if (!err) {
        result.status = status;
        result.data = user;
      } else {
        result.status = 404;
        result.error = err;
      }
      res.status(status).send(result);
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

const update_user = (res, user_patch, userId) => {
  const result = {};
  const status = 200;
  delete user_patch.username;
  User.findOneAndUpdate({
    _id: userId,
  }, {
    '$set': user_patch,
  }, {
    new: true,
  }, (err, user) => {
    if (!err) {
      result.status = status;
      result.data = user;
      res.status(status).send(result);
    } else {
      callBackError(res, 404, err);
    }
  });
};

exports.patch_user = (req, res) => {
  if (req.local.userId) {
    const userId = req.local.userId;
    const user = req.body;
    update_user(res, user, userId);
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.patch_password = (req, res) => {
  if (req.local.userId) {
    const userId = req.local.userId;
    const { password, newPassword } = req.body;
    User.findById(userId, (err, user) => {
      bcrypt.compare(password, user.password, (err, response) => {
        if (!err && response) {
          bcrypt.hash(newPassword, stage.saltingRounds, (err, hash) => {
            if (!err) {
              const user_patch = {
                password: hash,
              };
              update_user(res, user_patch, userId);
            } else {
              callBackError(res, 500, 'Error hashing password for user');
            }
          });
        } else {
          callBackError(res, 401, 'Wrong credential');
        }
      });
    }).select('+password');
  } else {
    callBackError(res, 500, 'Error hashing password for user');
  }
};

exports.delete_user = (req, res) => {
  const result = {};
  let status = 200;
  if (req.local.userId) {
    User.findOneAndRemove({
      _id: req.local.userId,
    }, (err) => {
      if (!err) {
        result.status = status;
        result.message = 'User successfully deleted';
      } else {
        status = 500;
        result.status = status;
        result.error = err;
      }
      res.status(status).send(result);
    });
  } else {
    callBackError(res, 500, 'Error hashing password for user');
  }
};
