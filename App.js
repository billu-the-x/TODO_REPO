const express = require('express')
const app = express();
const task = require('./routes/tasks')
const connectDb = require('./DB/connect');
const notFound = require('./midddlewares/notfound');
const errorHandler = require('./midddlewares/errorhandler');
require('dotenv').config();
// app.get('/hello',(req,res)=>{
// res.send("task manager app")
// })

app.use(express.json());
app.use('/api/v1/tasks',task)
app.use(notFound);
app.use(errorHandler)
const port = 8080;

const start = async ()=>{
  try{
    await connectDb(process.env.MONGO_URL);
    app.listen(port,()=>{
      console.log(`server listening on port ${port}`)
    })
  }
  catch (error){
    console.log(error)
  }
}

start();
