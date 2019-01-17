const mongoose = require('mongoose');
const { callBackError } = require('../helpers/callBackHelper.js');
const Aliment = mongoose.model('aliments');

exports.get_aliments = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const query = { userId: req.local.userId };
    if (req.query.search) {
      query.name = { '$regex': req.query.search, $options: 'i' };
    }
    const pagination = {};
    if (req.query.limit) {
      pagination.limit = parseInt(req.query.limit, 10);
    }
    if (req.query.skip) {
      pagination.skip = parseInt(req.query.skip, 10);
    }
    if (req.query.sort) {
      pagination.sort = req.query.sort;
    }
    Aliment.find(query, {}, pagination, (errAliment, aliments) => {
      if (!errAliment) {
        Aliment.countDocuments(query, (errCount, count) => {
          if (!errCount) {
            result.status = status;
            result.data = aliments;
            result.count = count;
          } else {
            result.status = 500;
            result.error = errCount;
          }
          res.status(status).send(result);
        });
      } else {
        callBackError(res, 500, 'Something went wrong');
      }
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.post_aliment = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const alimentObject = req.body;
    alimentObject.userId = req.local.userId;
    const new_aliment = new Aliment(alimentObject);
    new_aliment.save((err, aliment) => {
      if (!err) {
        result.status = status;
        result.data = aliment;
      } else {
        result.status = 500;
        result.error = err;
      }
      res.status(status).send(result);
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.get_aliment = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Aliment.findOne({ _id: req.params.alimentId, userId: req.local.userId },
      (err, aliment) => {
        if (!err) {
          result.status = status;
          result.data = aliment;
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


exports.patch_aliment = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const aliment_patched = req.body;
    aliment_patched.userId = req.local.userId;
    Aliment.findOneAndUpdate({
      _id: req.params.alimentId, userId: req.local.userId,
    }, { '$set': aliment_patched }, {
      new: true,
    }, (err, aliment) => {
      if (!err) {
        result.status = status;
        result.data = aliment;
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

exports.delete_aliment = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Aliment.findOneAndRemove({ _id: req.params.alimentId, userId: req.local.userId },
      (err) => {
        if (!err) {
          result.status = status;
          result.message = 'Aliment successfully deleted';
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
