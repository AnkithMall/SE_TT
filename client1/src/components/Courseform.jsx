import React from "react";
import {  useState } from "react";
import { read, utils } from 'xlsx';

const Courseform = () => {
    const [file,setFile] = useState("");

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
    };

    const postApi = async (jsonData) => {
        try {
            let res = await fetch("http://localhost:3001/course/add", {
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: jsonData
            });
            //let resJson = await res.json();
            if (res.status === 200) {
              alert("successfully uploaded");
            } else {
              alert("Some error occured");
            }
          } catch (err) {
            console.log(err);
          }
    };

    const excelFileToJSON = () => {
        try {
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = read(data, {
                    type : 'binary'
                });
    
                var firstSheetName = workbook.SheetNames[0];
                //reading only first sheet data
                var jsonData = utils.sheet_to_json(workbook.Sheets[firstSheetName]);
                alert(JSON.stringify(jsonData));
                //displaying the json result into HTML table
                //displayJsonToHtmlTable(jsonData);
                postApi(JSON.stringify(jsonData)) ;
            }
        }catch(e){
            console.error(e);
        }
    }
    
    const upload =  () => {
        if(file.length === 0){
            alert("Please choose any file...");
            return;
        }
        var filename = file.name ;
        var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
        if (extension === '.XLS' || extension === '.XLSX') {
            //Here calling another method to read excel file into json
            excelFileToJSON() ;
        }else{
            alert("Please select a valid excel file.");
        }
    }
    return (
        <>
            <input type="file" id="file_upload" name="course_file" onChange={handleFileChange} />
            <button id="submit" onClick={upload} >Upload</button>
        </>

    ) ;
}

export default Courseform ;