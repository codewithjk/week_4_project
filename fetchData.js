// fetchData.js
const axios = require("axios");

const apiKey = process.env.API_KEY;

async function getMoviesByGenre(genreId) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie`,
      {
        params: {
          api_key: apiKey,
          with_genres: genreId,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    throw error;
  }
}

module.exports = { getMoviesByGenre };
