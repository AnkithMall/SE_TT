const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const Course = new Schema({
    /*"id":{
        type:"String"
    },*/
    
    "float":[{
    "course ID":{
        type:String,
        required:true
    },
    "course name":{
        type:String,
        required:true
    },
    "type":{
        type:String,
        required:true
    },
    "Number of student":{
        type:Number,
        default:0
    }
}]}) ;

//const course = mongoose.model("courses",Course) ;

module.exports = mongoose.model("courses",Course) ;