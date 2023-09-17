const loggerMiddleware = (req, res, next) => {
  if (Object.keys(req.params).length > 0) {
    console.log(`'Params:',`, req.params);
  }

  if (Object.keys(req.query).length > 0) {
    console.log(`'Query:',`, req.query);
  }

  if (Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }

  next(); // Continue to the next middleware or route handler
};

module.exports = loggerMiddleware;
