const mongoose = require('mongoose');
const Token = mongoose.model('tokens');

const isAuthenticated = (req, res, next) => {
  if (req.query.t) {
    Token.find({ token: req.query.t }, (err, token) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          message: 'You need to be auth',
        });
      }
      if (!token.valid) {
        return res.status(403).json({
          status: 403,
          message: 'Token is expired',
        });
      }
      return next();
    });
  } else {
    res.status(401).json({
      status: 401,
      message: 'You need to be auth',
    });
  }
};

module.exports = isAuthenticated;
