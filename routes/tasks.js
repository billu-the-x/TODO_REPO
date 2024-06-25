const express = require('express')
const router = express.Router();

const {
  getAllTask,getTask,createTask,deleteTask,updateTask
} = require('../controllers/tasks')


router.post('/createtask',createTask)
router.get('/gettask',getAllTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;