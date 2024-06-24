import React from "react";
import { useState } from 'react';
import './App.css';

const DEBUGGING_LOCAL = 1;
const WEB_SERVICE_URL = "https://nvidia-contest-express-web-service.onrender.com";
const LOCAL_URL = "http://localhost:10000";
var service_url = WEB_SERVICE_URL;
if (DEBUGGING_LOCAL)
  service_url = LOCAL_URL;

export default function App() {
    const [imageSrc, setImageSrc] = useState();
    function handleChange(e) {

        let url = URL.createObjectURL(e.target.files[0]);

        //console.log(e.target.files[0]);
        //console.log(url);
        setImageSrc(url);
    }    

    function reqListener() {
        let responseElement = document.getElementsByName("response_label");
        //console.log(responseElement);
        responseElement[0].innerText = this.responseText;
        //console.log(this.responseText);
    }

    function handleSubmit(e) {

        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        const query = service_url + "/user/message?query=" + formData.get("question_input");

        const req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", query);
        req.send();

        // Or you can work with it as a plain object:
        //const formJson = Object.fromEntries(formData.entries());
        //console.log(formJson);
    }


    return (
        <form className="App" onSubmit={handleSubmit}>
          <div>
            <h2>Select an Image:</h2>
            <input type="file" accept=".jpg, .jpeg, .png" onChange={handleChange} />
            <img src={imageSrc} alt=""/>
          </div>
          <div>
              <label>
                Question: <input name="question_input" size="100" defaultValue="How many people in the picture?" />
              </label>
          </div>
          <div>
              <label name="response_label">
                Response will be placed here...
              </label>
          </div>
          <div>
              <button type="submit">Submit question</button>
          </div>
        </form>
    );
}
