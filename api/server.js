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
    try{
        
        const doc = new course({ "float":req.body }) ;
        const err = doc.validateSync() ;
        if(!!err) throw err ;

        const courses = await course.findOneAndReplace({_id:'6427f25abfde482833d6f0d9'},{ "float":req.body },{upsert: true, returnOriginal: false});
        res.json(courses.float) ;
    }catch(err){
        console.log("error occured") ;
        res.status(502).send() ;
    }
})

const clas = require("./models/Classes") ;

app.get('/classes', async (req,res)=> {
    const classes = await clas.find() ;
    res.json(classes) ;
})

app.post('/classes/add', async (req,res)=> {
    try{
        
        const doc = new clas({ "classDetails":req.body }) ;

        const err = doc.validateSync() ;
        if(!!err) throw err ;
        
        console.log("here")
        const Class = await clas.findOneAndReplace({_id: "643f822b6f1e861e596f36e4"},{ "classDetails":req.body },{upsert: true, returnOriginal: false});
        res.json(Class.classDetails) ;
    }catch(err){
        console.log("classes:error occured") ;
        console.log(err);
        res.status(502).send() ;
    }
})

const fs = require('fs');
const path = require('path');

app.get('/template', (req, res) => {
    const filePath = path.join(__dirname, 'Templates', 'Template.xlsx');
    
    res.download(filePath, 'Template.xlsx', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send();
    }
  });
});

app.listen(3001,()=>console.log("server started on port 3001")) ; 
