import React from "react";
import {  useState } from "react";
import { read, utils } from 'xlsx';
import JsonTable from './JsonTable' ;


const Courseform = () => {
    const [file,setFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [jsonData,setJson] = useState(null);
    const [resJson,setResJson] = useState(null);
    const [message,setMessage] = useState(null) ;
    const [messageColor,setMessageColor] = useState("red") ;
   
    //var jsonData = {} ;
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setIsFilePicked(true) ;
        setMessage(null) ;
    };

    const postApi = async (jsonData) => {
        try {
            await fetch("http://localhost:3001/course/add", {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: jsonData
            }).then(res => {
                //setStatus(res.status);
                //alert(res.status) ;
                if (res.status === 200) {
                    //alert("successfully uploaded");
                    setMessage("* successfully uploaded") ;
                    setMessageColor("green") ;
                } else if(res.status === 502 ){
                    //alert(res.status);
                    //alert("Details are not stored , please check xl sheet data format !") ;
                    setMessage("* Details are not stored , please check xl sheet data format !") ;
                    setMessageColor("red") ;
                }else
                {
                    //alert(status);
                    setMessage("* Some error occured") ;
                    setMessageColor("red") ;
                }
                return res.json() ;
            }
            ).then(result => {
                setResJson(result.map(u => ({
                    course_ID : u.course_ID, 
                    course_name : u.course_name ,
                    type : u.type ,
                    Number_of_student : u.Number_of_student ,
                    credits : u.credits,
                    professor : u.professor
                })
                ));
                //setResJson(result) ;
                //setStatus(status) ;
                //alert(res.status);
            },
            error => {
                //setStatus(status) ;
                console.log(error);
            });
            //alert(res.status);
            
          } catch (err) {
            console.log(err);
            alert(err) ;
          }
    };

    const excelFileToJSON = async () => {
        try {
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            return new Promise((resolve, reject) => {
                reader.onload = function(e) {
                    var data = e.target.result;
                    var workbook = read(data, {
                        type : 'binary'
                    });
                    var firstSheetName = workbook.SheetNames[0];
                    var jsondoc = utils.sheet_to_json(workbook.Sheets[firstSheetName]);
                    //alert(JSON.stringify(jsondoc)) ;
                    postApi(JSON.stringify(jsondoc)) ;
                    resolve(jsondoc);
                };
                reader.onerror = function(err) {
                    reject(err);
                };
            });
        } catch(e) {
            console.error(e);
        }
    }
    
    
    const upload = async () => {
        if(!isFilePicked){
            //alert("Please choose any file...");
            setMessage("* Please choose any file...") ;
            setMessageColor("red") ;
            return;
            
        }
        var filename = file.name ;
        var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
        if (extension === '.XLS' || extension === '.XLSX') {
            //Here calling another method to read excel file into json
            let json =  await excelFileToJSON() ;
            setJson(json) ;
        }else{
            //alert("Please select a valid excel file.");
            setMessage("* Please select a valid excel file.") ;
            setMessageColor("red") ;
        }
    }
    return (
        <>
        <div class="">
            <div class="container" style={{width: "34%" , margin: "20px auto" }}>
                <label for="FILEID" >Select file :&nbsp;</label>
                <input type="file" id="FILEID" name="course_file" onChange={handleFileChange} />
                <button id="submit" onClick={upload}>Upload</button>
                <br/><br/>
                <p style={{color:messageColor}}>&nbsp; {message}</p>
            </div>
            
        </div>
        <div id="display_excel_data">
            {jsonData && <JsonTable data={resJson} />}
        </div>
        </>
    ) ;
}

export default Courseform ;