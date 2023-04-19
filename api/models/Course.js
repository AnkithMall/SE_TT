const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;

const Course = new Schema({
    /*"id":{
        type:"String"
    },*/
    
    "float":[{
    "course_ID":{
        type:String,
        required:true
    },
    "course_name":{
        type:String,
        required:true
    },
    "type":{
        type:String,
        enum: ['core', 'elective'],
        required:true
    },
    "Number_of_student":{
        type:Number,
        default:0,
        min:0
    },
    "credits":{
        type:Number,
        enum:[2,3,4,5],
        required:true
    },
    "professor":{
        type:String,
        required:true
    }
}]}) ;

//const course = mongoose.model("courses",Course) ;

module.exports = mongoose.model("courses",Course) ;