const mongoose = require('mongoose');
const Token = mongoose.model('tokens');
const User = mongoose.model('users');

const generate_token = (length) => {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];
  for (let i = 0; i < length; i++) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
};

exports.get_token = (req, res) => {
  const new_token = new Token();
  new_token.save({}, (err, token) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: 200, data: token });
  });
};

exports.get_token_id = (req, res) => {
  Token.findById(req.params.tokenId, (err, token) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: 200, data: token });
  });
};

exports.post_token = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Token.findById(req.params.tokenId, (err) => {
    if (err) {
      res.send(err);
    }
    User.findOne({ username, password }, (err, user) => {
      if (err) {
        res.send(err);
      }
      const date = new Date();
      date.setDate(date.getDate() + 8);
      const tokenHash = generate_token(32);
      Token.findOneAndUpdate({
        _id: req.params.tokenId,
      }, {
        '$set': {
          valid: true,
          token: tokenHash,
          expire_at: date,
          userId: user._id,
        },
      }, { new: true },
      (err, token) => {
        if (err) {
          res.send(err);
        }
        res.json({ status: 200, data: token });
      });
    });
  });
};

exports.delete_token = (req, res) => {
  Token.remove({
    _id: req.params.tokenId,
  }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: 200,
      message: 'token successfully deleted',
    });
  });
};
