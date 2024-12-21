const DetailFetchApi = async (tickers) => {
    const movieApiKey = "1e2cd287"
  try {
    const res = await fetch(`https://www.omdbapi.com/?t=${tickers}&apikey=${movieApiKey}`); // Change to HTTPS

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const finalData = await res.json();
    console.log(finalData);
    return finalData;
  } catch (err) {
    console.error("Fetch error:", err);
    return null; // Handle the error as needed
  }
};


// DetailFetchApi()
export default DetailFetchApi;