const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {

// we want to send more user-friendly error codes

  //generic error
  let customError = {
    //if an error code exists then use it else use the internal server error
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, Please try again later'
  }
/*
if error name is a validation error, we want to create an array and map them into this new array
we also want to iterate in this array and join the items with a comma
 */
if (err.name === 'ValidationError'){
 //the essages are set in the User schema
   customError.msg =Object.values(err.errors).map((item) => item.message).join(',');
  customError.statusCode = 400;
}

if(err.name === 'CastError'){
  customError.msg = `No item found with id: ${err.value}`
  customError.statusCode = 404;
}

/*
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }*/
  //if error exists and if error matches mongoose duplicate key 11000 error then lets send our custom error
  if(err.code && err.code === 11000){
    //using javascript bject c;ass to find the exact error class
  customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400;
  }




 return res.status(customError.statusCode).json({msg: customError.msg})

}

module.exports = errorHandlerMiddleware
