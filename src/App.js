import React from "react";
import { useState } from 'react';
import './App.css';
//import Buffer from 'Buffer'


const DEBUGGING_LOCAL = 1;
const WEB_SERVICE_URL = "https://nvidia-contest-express-web-service.onrender.com";
const LOCAL_URL = "http://localhost:10000";
var service_url = WEB_SERVICE_URL;
if (DEBUGGING_LOCAL)
  service_url = LOCAL_URL;

export default function App() {
    const [imageSrc, setImageSrc] = useState();
    const [imageFile, setImageFile] = useState();

    const Msg1 = 
    "Please select an image using Browse button, enter a question and press Submit button to get an answer.";
    const Msg2 = "No image is selected. " + Msg1;

    function handleChange(e) {
        setImageFile(e.target.files[0]);
        let url = URL.createObjectURL(e.target.files[0]);

        setImageSrc(url);
    }    

    function reqListener() {
        let responseElement = document.getElementsByName("response_label");
        responseElement[0].innerText = this.responseText;
    }

    function handleSubmit(e) {

        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        const reader = new FileReader();
        reader.onloadend = (e) => {
            //console.log("e.target.result:", e.target.result);

            //const image_array = new Uint8Array(e.target.result);
            //const buffer_array = Buffer.from(image_array);
            //const imageB64 = Buffer.from(image_array).toString('base64');

            const query = service_url + "/user/message?query=" + formData.get("question_input");
            const req = new XMLHttpRequest();
            req.open("POST", query, true);     
            // the type is in imageFile.type
            // nvidia-contest_express-web-service/app.js currently accepts only imageFile.type "image/jpeg"
            req.setRequestHeader('Content-Type', imageFile.type);            
            req.addEventListener("load", reqListener);
            req.onreadystatechange = () => {
              if (req.readyState === 4 && (req.status === 200 || req.status === 201) ) {
                console.log("req.response:", req.response);
              }
            }
            /* it seems the send's argument can be:
                imageFile: File { name: "sample_image.jpeg", lastModified: 1718588201289, webkitRelativePath: "", size: 52604, type: "image/jpeg" }
                e.target.result: ArrayBuffer { byteLength: 52604 }
                image_array: Uint8Array(52604) [ 255, 216, 255, 224, 0, 16, 74, 70, 73, 70, … ]
                buffer_array: Array(52604) [ 255, 216, 255, 224, 0, 16, 74, 70, 73, 70, … ]
                The server seems to detect in all cases, but buffer_array:
                      [Symbol(kHeaders)]: {
                          accept: 'star/star',
                          'content-type': 'image/jpeg',
                          'content-length': '52604',
                          
                       rawHeaders: [
                          'Content-Type',
                          'image/jpeg',
                          'Content-Length',
                          '52604',                
                How can it be?
            */
            req.send(e.target.result);
        };
        if (imageFile === undefined) {
          let responseElement = document.getElementsByName("response_label");
          responseElement[0].innerText = Msg2;

          return;
        }
        reader.readAsArrayBuffer(imageFile);
    }


    // nvidia-contest_express-web-service/app.js currently accepts only imageFile.type "image/jpeg"
    //             <input type="file" accept=".jpg, .jpeg, .png" onChange={handleChange} />
    return (
        <form className="App" onSubmit={handleSubmit}>
          <div>
            <h2>Ask questions about an image:</h2>
            <input type="file" accept=".jpeg" onChange={handleChange} />
            <img src={imageSrc} alt=""/>
          </div>
          <div>
              <label>
                Question: <input name="question_input" size="100" defaultValue="How many people in the picture?" />
              </label>
          </div>
          <div>
              <label name="response_label" >
                {Msg1}
              </label>
          </div>
          <div>
              <button type="submit">Submit</button>
          </div>
        </form>
    );
}
