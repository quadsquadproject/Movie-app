import React, { useEffect, useState } from "react";
// import fetchingApi from './Api.jsx'
import Searchbar from "./components/Searchbar.jsx";
import DisplaySearch from "./components/DisplaySearch.jsx";
import DashBoard from "./components/DashBoard.jsx";
import "./App.css";
import fetchWebApi from "./Api.jsx";
import { useNavigate } from "react-router-dom";

// import DetailFetchApi from "./DetailApi.jsx";

const App = ({ onSearch }) => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isRating, setIsRating] = useState();

  
  // console.log(data)
  const handleSearch = (term) => {
    console.log(term);
    setData(term);
    setIsRating();
  };

  const handleSearchDashboard = async (term) => {
    console.log(term);
    let value = await fetchWebApi(term);
    console.log(value);
    setData(value);
  };

  const handleSearchTerm = (rating) => {
    console.log(rating);
    setData(rating);
    onSearch(rating)
    navigate('/overview')
  };

  return (
    <div className="App_container">
      <Searchbar onSearch={handleSearch} />
      {data[0] ? (
        <DisplaySearch data={data} onSearch={handleSearchTerm}/>
      ) : (
        <DashBoard onClick={handleSearchTerm} />
      )}
    </div>
  );
};

export default App;
