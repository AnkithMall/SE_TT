import React from "react";
import {  useState } from "react";
import { read, utils } from 'xlsx';
import JsonTable from './JsonTable' ;
import {Form,Button,Row} from 'react-bootstrap';


const Classform = () => {
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
            await fetch("http://localhost:3001/classes/add", {
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
                    //alert("hi");
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
                    class_number : u.class_number, 
                    Capacity : u.Capacity ,
                    slot1 : u.slot1.status?"Occupied":"UnOccupied" ,
                    slot2 : u.slot2.status?"Occupied":"UnOccupied" ,
                    slot3 : u.slot3.status?"Occupied":"UnOccupied" ,
                    slot4 : u.slot4.status?"Occupied":"UnOccupied" ,
                    slot5 : u.slot5.status?"Occupied":"UnOccupied" ,
                    slot6 : u.slot6.status?"Occupied":"UnOccupied" ,
                    slot7 : u.slot7.status?"Occupied":"UnOccupied" ,
                    slot8 : u.slot8.status?"Occupied":"UnOccupied" 
                })
                ));
                //setResJson(result) ;
                //setStatus(status) ;
                //alert(resJson.Capacity);
            },
            error => {
                //setStatus(status) ;
                alert(error);
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
                    var firstSheetName = workbook.SheetNames[1];
                    var jsondoc = utils.sheet_to_json(workbook.Sheets[firstSheetName],{raw: false});
                   //alert(JSON.stringify(jsondoc)) ;
                  // alert(JSON.stringify(jsondoc))
                    jsondoc.forEach(object => {
                        object.slot1 = {status:object.slot1.toLowerCase() === "true"} ;
                        object.slot2 = {status:object.slot2.toLowerCase() === "true"} ;
                        object.slot3 = {status:object.slot3.toLowerCase() === "true"} ;
                        object.slot4 = {status:object.slot4.toLowerCase() === "true"} ;
                        object.slot5 = {status:object.slot5.toLowerCase() === "true"} ;
                        object.slot6 = {status:object.slot6.toLowerCase() === "true"} ;
                        object.slot7 = {status:object.slot7.toLowerCase() === "true"} ;
                        object.slot8 = {status:object.slot8.toLowerCase() === "true"} ;
                    });
                  //  alert(JSON.stringify(jsondoc));
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
   // alert(resJson);
    return (
        <>
      
          {/*  <div className="container" style={{width: "34%" , margin: "20px auto" }}>
                <label for="FILEID" >Select file :&nbsp;</label>
                <input type="file" id="FILEID" name="class_file" onChange={handleFileChange} />
                <button id="submit" onClick={upload}>Upload</button>
                <br/><br/>
                <p style={{color:messageColor}}>&nbsp; {message}</p>
    </div>*/}
            <div className="container" style={{width: "34%" , margin: "20px auto" }}>
            <h2 className="mb-3">Class Form</h2>
            <Row className="mb-3" >
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label >Select file </Form.Label>
                    <Form.Control type="file" name="course_file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" onClick={upload} >Upload</Button>
            </Row>
    <p style={{color:messageColor}}>&nbsp; {message}</p>
    </div>
        <div id="display_excel_data">

            {jsonData && <JsonTable data={resJson} title={"Updated Class Details"}/>}
        </div>
        </>
    ) ;
}

export default Classform ;