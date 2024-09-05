const ErrorResponse = require("../utils/errorResponse");

const errorhandler = (err, req, res, next) => {
  let error = {...err};
  error.message = err.message;
  if(err.code === 11000){
    const message = "duplicate value inputted"
    error = new ErrorResponse(message, 400)
  }
  if(err.name === 'ValidationError')
  {
    
    const message = Object.values(err.errors).map(value => value.message);
    error = new ErrorResponse(message, 400)

  }
  //mongoose bad objectId
  if(err.name === 'CastError')
  {
    const message = "Resource not found"
    error = new ErrorResponse(message, 404)
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};
module.exports = errorhandler;
