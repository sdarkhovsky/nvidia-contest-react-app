
export default function App() {
  function reqListener() {
    console.log(this.responseXML);
    //responseText["message"]["content"]
  }

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const URL = "https://nvidia-contest-express-web-service.onrender.com";
    const query = URL + "/user/message?query=" + formData.get("myInput");

    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", query);
    req.send();

    // Or you can work with it as a plain object:
    //const formJson = Object.fromEntries(formData.entries());
    //console.log(formJson);
  }


  function fetch_handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    const URL = "https://nvidia-contest-express-web-service.onrender.com";
    const query = URL + "/user/message?query=" + formData.get("myInput");

    // You can pass formData as a fetch body directly:
    fetch(query, { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  async function async_fetch_handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const URL = "https://nvidia-contest-express-web-service.onrender.com";
    const query = URL + "/user/message?query=" + formData.get("myInput");
    console.log(query);    

    // You can pass formData as a fetch body directly:
    //fetch('/some-api', { method: form.method, body: formData });
    const response = await fetch(query);
    console.log(response);

    // Or you can work with it as a plain object:
    // const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <label>
        Text input: <input name="myInput" defaultValue="How many people in the picture?" />
      </label>
      <hr />
      <p>
        Some image will be here:
      </p>
      <hr />
      <button type="reset">Reset form</button>
      <button type="submit">Submit form</button>
    </form>
  );
}
