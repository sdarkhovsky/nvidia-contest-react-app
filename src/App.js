import React, { useState } from "react";

export default function App() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
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

        const DEBUGGING_LOCAL = 0;

        var URL = "https://nvidia-contest-express-web-service.onrender.com";
        if (DEBUGGING_LOCAL)
          URL = "http://localhost:10000";

        const query = URL + "/user/message?query=" + formData.get("question_input");

        const req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", query);
        req.send();

        // Or you can work with it as a plain object:
        //const formJson = Object.fromEntries(formData.entries());
        //console.log(formJson);
    }


    return (
        <div className="App">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
            <form method="post" onSubmit={handleSubmit}>
              <label>
                Question: <input name="question_input" size="100" defaultValue="How many people in the picture?" />
              </label>
              <hr />
              <label name="response_label">
                Response will be placed here...
              </label>
              <hr />
              <button type="submit">Submit question</button>
            </form>
        </div>            
    );
}
