const {createCustomError, CustomAPIError} = require('../errors/custom-error.js');
const { getMaxListeners } = require('../models/task.js');

const errorHandler = (err,req,res,next)=>{
  if (err instanceof CustomAPIError){
    return res.status(err.statusCode).json({msg :err.message});
  }
  return res.status(500).json({msg:"something went wrong please try again "})
};

module.exports = errorHandler;
