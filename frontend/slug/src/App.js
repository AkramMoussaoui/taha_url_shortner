import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState();
  const [slug, setSlug] = useState();
  const [click, setClick] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/url", {
        url: url,
        slug: slug,
      })
      .then((response) => {
        setClick(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form>
        <label>
          Url :
          <input onChange={(e) => setUrl(e.target.value)} type="url" />
        </label>
        <br />
        <label>
          Slug :
          <input onChange={(e) => setSlug(e.target.value)} />
        </label>
        <br />
        <input onClick={(e) => handleClick(e)} type="submit" />
      </form>
    </div>
  );
}

export default App;
