import React, { useState, useEffect } from "react";
import "./App.css";
import Feed from "./components/Feed";
import SearchBar from "./components/SearchBar";

function App() {
  const [stories, setStories] = useState([]);
  const [option, setOption] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [url, setURL] = useState(
    "http://hn.algolia.com/api/v1/search?tags=story"
  );

  let searchInput = React.createRef();
  let selectOptions = React.createRef();

  const handleChange = () => {
    setInputValue(searchInput.current.value);
    setOption(selectOptions.current.value);
    setURL(
      `http://hn.algolia.com/api/v1/search?query=${searchInput.current.value}&tags=${selectOptions.current.value}`
    );
  };

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((stories) => setStories(stories.hits));
  }, [url]);

  return (
    <div className="App">
      <SearchBar
        option={option}
        searchInput={searchInput}
        selectOptions={selectOptions}
        inputValue={inputValue}
        handleChange={handleChange}
      />
      <Feed stories={stories} option={option} />
    </div>
  );
}

export default App;
