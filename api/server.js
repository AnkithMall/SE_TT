const express = require('express') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;

const app = express() ;

app.use(express.json()) ;
app.use(cors()) ;

mongoose.connect("mongodb://127.0.0.1:27017/tt",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connected to DB")).catch(console.error) ;

const course = require("./models/Course") ;

app.get('/courses', async (req,res)=> {
    const courses = await course.find() ;

    res.json(courses) ;
})

app.post('/course/add', async (req,res)=> {
    /*const courses = new course({
        "float":req.body
    }) ;*/
    //console.log(req.body) ;
    try{
        
        const doc = new course({ "float":req.body }) ;
        //console.log("err") ;
        
        const err = doc.validateSync() ;
        if(!!err) throw err ;
        //console.log(err) ;

        const courses = await course.findByIdAndUpdate('6427f25abfde482833d6f0d9',{ "float":req.body });
        res.json(courses.float) ;
    }catch(err){
        //console.log("error occured") ;
        res.status(502).send() ;
    }
})
/*app.delete('/course/delete/:type', async (req,res)=> {
    const courses = await course.findByIdAndDelete(req.params.type) ;

    res.json(courses) ;
})*/

app.listen(3001,()=>console.log("server started on port 3001")) ; 
