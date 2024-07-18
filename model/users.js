const mongoose = require('mongoose')
const { Schema } = mongoose;

const usersSchema = new Schema({
  email:{type: String, required:true} ,
  firstName:{type:String, required:true}
})

exports.users = mongoose.model('users',usersSchema,'users')