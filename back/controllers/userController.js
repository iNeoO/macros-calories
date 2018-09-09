const mongoose = require('mongoose');
const User = mongoose.model('users');

exports.get_users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: 200, data: users });
  });
};

exports.post_user = (req, res) => {
  const new_user = new User(req.body);
  new_user.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: 200, data: user });
  });
};

exports.get_user = (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: 200, data: user });
  });
};

exports.patch_user = (req, res) => {
  const user_patched = {
    name: req.body.name,
    password: req.body.password,
  };
  const date = new Date();
  user_patched.updated_at = date;
  User.findOneAndUpdate({
    _id: req.params.userId,
  }, { '$set': user_patched }, {
    new: true,
  }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ status: 200, data: user });
  });
};

exports.delete_user = (req, res) => {
  User.remove({
    _id: req.params.userId,
  }, (err) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: 200,
      message: 'User successfully deleted',
    });
  });
};
