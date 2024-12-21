import React, { useEffect } from "react";
import "./DetailOverview.css";

const DetailOverview = ({ data }) => {
  console.log(data);

  useEffect(() => {
    // Store data in localStorage when it changes
    if (data) {
      localStorage.setItem("movieData", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    // Check localStorage for existing data on component mount
    const storedData = localStorage.getItem("movieData");
    if (storedData) {
      // If data exists, parse it and set it to the component's state or props
      // You may need to handle this in the parent component
      // Here we log it to verify it's working
      console.log("Loaded data from localStorage:", JSON.parse(storedData));
    }
    console.log(storedData)
  }, []);

  

  return (
    <div className="contain">
      <h1>Overview of movie</h1>
      <div className="detail_container">
        <div className="detail_display">
          <h1>{data.Title}</h1>
          <div>
            <span>{data.Year}</span>
            <span> {data.Rated}</span>
            <span> {data.Released}</span>
          </div>
          <div className="container_img">
            <img src={data.Poster} alt="" className="Poster_img1" />
          </div>
          <div>
            <p>{data.Plot}</p>
          </div>
          <div className="rating_container">
            {data.Ratings.map((m) => (
              <span key={m.Source}>
                {m.Source} - {m.Value}
              </span>
            ))}
          </div>
          <div className="director_container">
            <h3>
              Director{" "}
              {data.Director.split(" ").map((director) => (
                <a href={director} key={director}>
                  {director}
                </a>
              ))}
            </h3>
          </div>
          <div className="stars_container">
            <h3>
              Stars{" "}
              {data.Actors.split(", ").map((actor, index) => (
                <a href={actor} key={index}>
                  {actor}
                </a>
              ))}
            </h3>
          </div>
          <div className="writers_container">
            <h3>
              Writers{" "}
              {data.Writer.split(", ").map((writer) => (
                <a href={writer} key={writer}>
                  {writer}
                </a>
              ))}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailOverview;
