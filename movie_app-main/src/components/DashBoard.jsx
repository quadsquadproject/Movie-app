import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import DetailFetchApi from "../DetailApi";

const DashBoard = ({ onClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getRandomKeyword = () => {
    const keywords = [
      "Interstellar",
      "cars",
      "top gun",
      "namaste london",
      "Baahubali",
      "home alone",
      "3 idiots",
      "red",
      "Ad Astra",
      "Greenland",
    ];
    return keywords[Math.floor(Math.random() * keywords.length)];
  };

  const fetchDashBoard = async () => {
    setLoading(true);
    setError(null);
    const fetchedMovies = new Set();
    let retries = 0;

    while (fetchedMovies.size < 10 && retries < 20) {
      const keyword = getRandomKeyword();
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?t=${keyword}&apikey=1e2cd287`
        );
        const data = await response.json();

        if (data && data.Response !== "False" && !fetchedMovies.has(data.Title)) {
          fetchedMovies.add(data);
        }
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        setError("Failed to load movies. Please try again later.");
      }
      retries += 1;
    }

    setMovies(Array.from(fetchedMovies).sort(() => Math.random() - 0.5));
    setLoading(false);
  };

  useEffect(() => {
    fetchDashBoard();
  }, []);

  const handleClickTitle = async (title) => {
    try {
      const response = await DetailFetchApi(title);
      console.log(response);
      onClick(response);
    } catch (error) {
      console.error("Failed to fetch details:", error);
      setError("Failed to load details. Please try again later.");
    }
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="dashboard-container">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="dashboard_movie_container"
            onClick={() => handleClickTitle(movie.Title)}
          >
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <img
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              className="dashboard_img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
