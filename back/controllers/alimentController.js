const mongoose = require('mongoose');
const Aliment = mongoose.model('aliments');
const Token = mongoose.model('tokens');

exports.get_aliments = (req, res) => {
  Token.findById(req.query.t, (err, token) => {
    if (err) {
      res.send(err);
    }
    Aliment.find({ userId: token.userId }, (err, aliments) => {
      if (err) {
        res.send(err);
      }
      res.json({ status: 200, data: aliments });
    });
  });
};

exports.post_aliment = (req, res) => {
  Token.findById(req.query.t, (err, token) => {
    if (err) {
      res.send(err);
    }
    const new_aliment = new Aliment(req.body);
    new_aliment.userId = token.userId;
    new_aliment.save((err, aliment) => {
      if (err) {
        res.send(err);
      }
      res.json({ status: 200, data: aliment });
    });
  });
};

exports.get_aliment = (req, res) => {
  Token.findById(req.query.t, (err, token) => {
    if (err) {
      res.send(err);
    }
    Aliment.find({ _id: req.params.alimentId, userId: token.userId },
      (err, aliment) => {
        if (err) {
          res.send(err);
        }
        res.json({ status: 200, data: aliment });
      });
  });
};

exports.patch_aliment = (req, res) => {
  Token.findById(req.query.t, (err, token) => {
    if (err) {
      res.send(err);
    }
    const aliment_patched = {
      name: req.body.name,
      quantity: req.body.quantity,
      kcal: req.body.kcal,
      carbohydrate: req.body.carbohydrate,
      fat: req.body.fat,
      protein: req.body.protein,
      fibre: req.body.fibre,
    };
    const date = new Date();
    aliment_patched.updated_at = date;
    Aliment.findOneAndUpdate({
      _id: req.params.alimentId, userId: token.userId,
    }, { '$set': aliment_patched }, {
      new: true,
    }, (err, aliment) => {
      if (err) {
        res.send(err);
      }
      res.json({ status: 200, data: aliment });
    });
  });
};

exports.delete_aliment = (req, res) => {
  Token.findById(req.query.t, (err, token) => {
    if (err) {
      res.send(err);
    }
    Aliment.remove({
      _id: req.params.alimentId, userId: token.userId,
    }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({
        status: 200,
        message: 'User successfully deleted',
      });
    });
  });
};
