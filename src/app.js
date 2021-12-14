const express = require('express')

const app = express();

// Development logger
if (process.env.NODE_ENV === "dev") {
  const morgan = require('morgan')
  app.use(morgan("dev"))
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
app.use('/', require('./routes'))

// 404 HANDLER
app.use((_req, _res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  return next(err);
});

// ERROR HANDLER
app.use((err, _req, res, _next) => {
  // Mongoose ValidationError set to be 422 instead of 500
  if (err.stack && err.stack.includes('ValidationError')) err.status = 422
  if (!err.status) err = Object.assign({}, err, { message: err.message || undefined }, { stack: err.stack || undefined }, { status: 500 })
  res.status(err.status).json({ message: err.message || undefined, status: err.status || undefined, errors: err.errors || undefined })
})

module.exports = app
