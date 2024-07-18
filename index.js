const express = require('express');
const cors = require('cors');
const server = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/users')

const dbURL='mongodb+srv://user:aFUtmHtS8DacrzMh@cluster0.flpz7g7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbURL).then(() =>{
  console.log('connected to db')
}).catch((e)=>{
  console.log('error',e)
})

server.use(cors())
server.use(express.json())

server.use('/', userRouter.routes)

server.listen(8000,()=>{
  console.log("server started")
})