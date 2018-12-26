const mongoose = require('mongoose');
const { callBackError } = require('../helpers/callBackHelper.js');
const { getNearestMeasurementQuery } = require('../helpers/measurementHelper.js');
const Measurement = mongoose.model('measurements');

exports.get_measurements = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const query = { userId: req.local.userId };
    if (req.query.from && req.query.to) {
      const from = new Date(req.query.from);
      const to = new Date(req.query.to);
      if (from.getTime() && to.getTime()) {
        to.setDate(to.getDate() + 1);
        query.date = {
          '$gte': from,
          '$lt': to,
        };
      }
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
    Measurement.find(query, {}, pagination, (errMeasurement, measurements) => {
      if (!errMeasurement) {
        Measurement.countDocuments(query, (errCount, count) => {
          if (!errCount) {
            result.status = status;
            result.data = measurements;
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

exports.get_measurements_dates = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Measurement.find({ userId: req.local.userId }, (errMeasurement, measurementsDates) => {
      if (!errMeasurement) {
        result.status = status;
        result.data = measurementsDates.map((measurement) => measurement.date);
      } else {
        result.status = 500;
        result.error = errMeasurement;
      }
      res.status(status).send(result);
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.get_measurement = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Measurement.findOne({ _id: req.params.measurementId, userId: req.local.userId },
      (err, measurement) => {
        if (!err) {
          result.status = status;
          result.data = measurement;
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

exports.get_nearest_measurement = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    let date = new Date(req.query.date);
    if (!date.getTime()) {
      date = new Date();
    }
    const query = getNearestMeasurementQuery(req.local.userId, date);
    Measurement.aggregate(query,
      (err, measurement) => {
        if (!err) {
          result.status = status;
          result.data = measurement;
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

exports.post_measurement = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const measurementObject = req.body;
    measurementObject.userId = req.local.userId;
    const new_measurement = new Measurement(measurementObject);
    new_measurement.save((err, measurement) => {
      if (!err) {
        result.status = status;
        result.data = measurement;
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


exports.patch_measurement = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const measurement_patched = req.body;
    measurement_patched.userId = req.local.userId;
    Measurement.findOneAndUpdate({
      _id: req.params.measurementId, userId: req.local.userId,
    }, { '$set': measurement_patched }, {
      new: true,
    }, (err, measurement) => {
      if (!err) {
        result.status = status;
        result.data = measurement;
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

exports.delete_measurement = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Measurement.findOneAndRemove({ _id: req.params.measurementId, userId: req.local.userId },
      (err) => {
        if (!err) {
          result.status = status;
          result.message = 'Measurement successfully deleted';
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
