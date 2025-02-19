
const createError = require('http-errors');

// Middleware pour gérer les erreurs 404
const notFoundHandler = (req, res, next) => {
  next(createError(404));
};

// Middleware pour gérer les erreurs générales
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
};

module.exports = { notFoundHandler, errorHandler };
