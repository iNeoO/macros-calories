const mongoose = require('mongoose');
const groupBy = require('lodash/groupBy');
const { callBackError } = require('../helpers/callBackHelper.js');
const { getWeekNumber } = require('../helpers/dateHelper.js');
const { getStats } = require('../helpers/macroHelper.js');
const Macro = mongoose.model('macros');
const User = mongoose.model('users');

exports.get_macros = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const query = { userId: req.local.userId };
    if (req.query.from && req.query.to) {
      const from = new Date(req.query.from);
      const to = new Date(req.query.to);
      if (from.getTime() && to.getTime()) {
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
    Macro.find(query, {}, pagination, (errMacro, macros) => {
      if (!errMacro) {
        Macro.countDocuments(query, (errCount, count) => {
          if (!errCount) {
            if (macros.length < 7 && req.query.from) {
              const d = new Date(req.query.from);
              const days = [];
              for (let i = 0; i < 7; i += 1) {
                for (let j = 0; j < macros.length; j += 1) {
                  const macroDate = new Date(macros[j].date);
                  macroDate.setDate(macroDate.getDate());
                  if (d.getDate() === macroDate.getDate() &&
                  d.getMonth() === macroDate.getMonth() &&
                  d.getFullYear() == macroDate.getFullYear()) {
                    days.push(macros[j]);
                    break;
                  }
                }
                if (days.length < i + 1) {
                  days.push({
                    date: new Date(d),
                    aliments: [],
                  });
                }
                d.setDate(d.getDate() + 1);
              }
              result.data = days;
            } else {
              result.count = count;
              result.data = macros;
            }
            result.status = status;
          } else {
            result.status = 500;
            result.error = errCount;
          }
          res.status(status).send(result);
        });
      } else {
        callBackError(res, 500, errMacro);
      }
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.get_macros_dates = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Macro.find({ userId: req.local.userId }, (errMacro, macrosDates) => {
      if (!errMacro) {
        result.status = status;
        result.data = macrosDates.map((macro) => macro.date);
      } else {
        result.status = 500;
        result.error = errMacro;
      }
      res.status(status).send(result);
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.get_macros_stats = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    User.findById(req.local.userId, (err, user) => {
      if (!err) {
        const query = { userId: req.local.userId };
        const to = new Date();
        const from = new Date(new Date().setFullYear(to.getFullYear() - 1));
        to.setDate(to.getDate() + 1);
        query.date = {
          '$gte': from,
          '$lt': to,
        };
        Macro.find(query, {}, { sort: 'date' }, (errMacro, macros) => {
          if (!errMacro) {
            result.status = status;
            const macros_by_weeks = getStats(groupBy(macros, getWeekNumber), user);
            result.status = status;
            result.data = macros_by_weeks;
          } else {
            result.status = 500;
            result.error = errMacro;
          }
          res.status(status).send(result);
        });
      } else {
        result.status = 404;
        result.error = err;
        res.status(status).send(result);
      }
    });
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.get_macro = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Macro.findOne({ _id: req.params.macroId, userId: req.local.userId },
      (err, macro) => {
        if (!err) {
          result.status = status;
          result.data = macro;
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

exports.post_macro = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    const macroObject = req.body;
    macroObject.userId = req.local.userId;
    const new_macro = new Macro(macroObject);
    new_macro.save((err, macro) => {
      if (!err) {
        result.status = status;
        result.data = macro;
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


exports.patch_macro = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    if (req.body.aliments && Array.isArray(req.body.aliments)) {
      const aliments = req.body.aliments.map(aliment => {
        return {
          mealType: aliment.mealType,
          quantity: aliment.quantity,
          name: aliment.name,
          kcal: aliment.kcal,
          carbohydrate: aliment.carbohydrate,
          fat: aliment.fat,
          protein: aliment.protein,
          fiber: aliment.fiber,
        };
      });
      const macro_patched = {
        height: req.body.height,
        weight: req.body.weight,
        activityType: {
          type: req.body.activityType.type,
          variation: req.body.activityType.variation,
          objKcal: req.body.activityType.objKcal,
        },
        nutriments: {
          carbohydrate: req.body.nutriments.carbohydrate,
          fat: req.body.nutriments.fat,
          protein: req.body.nutriments.protein,
          fiber: req.body.nutriments.fiber,
        },
        aliments,
      };
      Macro.findOneAndUpdate({
        _id: req.params.macroId, userId: req.local.userId,
      }, { '$set': macro_patched }, {
        new: true,
      }, (err, macro) => {
        if (!err) {
          result.status = 200;
          result.data = macro;
        } else {
          result.status = 404;
          result.error = err;
        }
        res.status(status).send(result);
      });
    } else {
      callBackError(res, 400, 'Wrong request');
    }
  } else {
    callBackError(res, 500, 'Something went wrong');
  }
};

exports.delete_macro = (req, res) => {
  const result = {};
  const status = 200;
  if (req.local.userId) {
    Macro.findOneAndRemove({ _id: req.params.macroId, userId: req.local.userId },
      (err) => {
        if (!err) {
          result.status = status;
          result.message = 'Macro successfully deleted';
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
