const fetchWebApi = async (tickers) => {
  const movieApiKey = "1e2cd287"
  try {
    const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=1e2cd287&s=${tickers}`); // Change to HTTPS

    if (!res.ok) {
      throw new Error(`Error: ${res.status} - ${res.statusText}`);
    }

    const finalData = await res.json();
    console.log(finalData.Search);
    return finalData.Search;
  } catch (err) {
    console.error("Fetch error:", err);
    return null; // Handle the error as needed
  }
};

export default fetchWebApi;
