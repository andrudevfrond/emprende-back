const mongoose = require("mongoose")

const Schema = mongoose.Schema

//schema
const taskSchema = new Schema({
    name: String,
    done: Boolean,
    //createBy
})

const Task = mongoose.model("Task", taskSchema)

module.exports = {Task}