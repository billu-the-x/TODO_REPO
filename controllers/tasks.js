const asyncWrapper = require('../midddlewares/trycatch.js')

const {createCustomError} = require('../errors/custom-error.js')

const Task = require("../models/task.js")

const getAllTask =asyncWrapper (async (req,res,next)=>{
  
    const tasks = await Task.find({})
    res.status(200).json({tasks:tasks})
    
  
});

const createTask =asyncWrapper (async (req,res,next)=>{
  
    const task = await Task.create(req.body);
    res.status(201).json({task});
   
  
  
});

const getTask = asyncWrapper(async (req,res,next)=>{

  const {id:taskID} = req.params;
  const singleTask = await Task.findOne({_id:taskID})
  if(!singleTask){
    return next(createCustomError(`No task with id : ${taskID}`,404))
    }
 res.status(200).json(singleTask)
  
 
});

const deleteTask =async (req,res,next)=>{
  
    const {id:taskID} = req.params;
    const deletedTask = await Task.findOneAndDelete({_id:taskID})
    if(!deletedTask){
      return next(createCustomError(`No task with id : ${taskID}`,404))
    
    
   }
   res.status(200).json({deletedTask})
};

const updateTask =async (req,res,next)=>{
  
    const {id:taskID} = req.params;
    const updatedTask = await Task.findOneAndUpdate({_id:taskID},req.body,{
      new:true,
      runValidators:true
    })
    if(!updatedTask){
      return next(createCustomError(`No task with id : ${taskID}`,404))
    
    
   }
   res.status(200).json({updatedTask})
};


module.exports = {
  getAllTask,getTask,createTask,deleteTask,updateTask
}