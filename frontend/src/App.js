import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [isPost, setIsPost] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts").then((res) => {
      // console.log(res.data);
      setData(res.data);
    });
  }, [isPost]);

  const dataList = data.map((item) => {
    return (
      <>
        <p>{item.title}</p>
      </>
    );
  });

  // const lesson = (e) => {
  //   e.preventDefault();
  //   setTitle(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    axios
      .post(
        "http://localhost:8000/api/posts",
        { title }
        // { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setIsPost(true);
        setTitle("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(isPost);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {dataList}
    </div>
  );
}

export default App;
