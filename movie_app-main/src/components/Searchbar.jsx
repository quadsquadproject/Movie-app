import React, { useState } from "react";
import fetchWebApi from "../Api";
import "./SearchBar.css";
// import { FaSearch } from "react-icons/fa";
import LOGO from "../movie_app_logo.jpg";

const Searchbar = ({ onSearch }) => {
  const [inputText, setInputText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [response, setResponse] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState([]);

  const handleSubmit = async (e) => {
    // setShowSuggestions(e.target.value);
    console.log(e.target.value);
    e.preventDefault();
    try {
      let data = await fetchWebApi(inputText);
      console.log(data);
      setResponse(data);
      onSearch(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleChange = async (e, title) => {
    setInputText(e.target.value);
    console.log(title);
    console.log(e.target.value);

    try {
      const a = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=1e2cd287&s=${e.target.value}`
      ); // Change to HTTPS
      // console.log(a)
      if (!a.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }

      let b = await a.json();
      let finalData = b.Search.filter((m) => {
        return m.Title.toLowerCase().includes(inputText.toLowerCase());
      });
      console.log(finalData);
      setShowSuggestions(finalData);
    } catch (error) {
      console.error(error);
    }
    // setInputText(title)
  };

  const handleSubmitSearch = async (title) => {
    setInputText(title);
    try {
      let data = await fetchWebApi(title);
      console.log(data);
      setResponse(data);
      onSearch(data);
      setShowSuggestions("");
      // handleChange(e, title)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="logo_container">
        <img src={LOGO} onClick={handleLogoClick} alt="logo"></img>
      </div>
      <div className={`box ${isExpanded ? "expanded" : ""}`}>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={inputText}
              onChange={(e) => handleChange(e)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              className={`input ${isExpanded ? "expanded" : ""}`}
            />
            {showSuggestions.length > 0 ? (
              <div className="suggestions">
                {showSuggestions.map((movie) => (
                  <div
                    key={movie.imdbID}
                    onClick={() => {
                      handleSubmitSearch(movie.Title);
                      setResponse(movie.Title);
                    }}
                  >
                    {movie.Title}
                  </div>
                ))}
              </div>
            ) : (
              inputText && <div className="loading_spinner"></div>
            )}
          </div>

          <div className="btn_search">
            <button type="submit" className="btn_submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
