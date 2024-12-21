import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import DetailOverview from "./components/DetailOverview";

const AppRoutes = () => {
  const [data, setData] = useState([]);
    const handleSearch = (term) => {
        console.log(term)
        setData(term)
    }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App onSearch={handleSearch} />} />
        {/* <Route path="/search" element={<DisplaySearch />} /> */}
        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        <Route path="/overview" element={<DetailOverview data={data}/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
