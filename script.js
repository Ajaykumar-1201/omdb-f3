// const url = "https://www.omdbapi.com/?s={SEARCH_TERM}&apikey={API_KEY}"
const url = "https://www.omdbapi.com/";
// const api = "dcbfff37";

const inputElement = document.getElementById("search");
const buttonElement = document.getElementById("btn");
const inputApi = document.getElementById("api");
const container = document.getElementById("container");

async function fetchSearchResults(searchTerm) {
  const api = inputApi.value;
  const endpoint = `${url}?s=${searchTerm}&apikey=${api}`;
  try {
    const response = await fetch(endpoint);
    const result = await response.json();

    console.log(result);

    renderMovieDetailsOntoUI(result.Search); // 2
  } catch (error) {
    alert("Some error occured");
  }
}

/*
Poster
: 
"https://m.media-amazon.com/images/M/MV5BNDk0NDU1NzEwN15BMl5BanBnXkFtZTgwMTgyNTA2NjE@._V1_SX300.jpg"
Title
: 
"OMG: Oh My God!"
Type
: 
"movie"
Year
: 
"2012"
imdbID
: 
"tt2283748"
*/

function renderMovieDetailsOntoUI(videosList) {
  container.innerHTML = "";
  videosList.forEach((movie) => {
    const videoContainer = document.createElement("div");
    videoContainer.className = "card";
    videoContainer.innerHTML = `
        <div class="img">
            <img src="${movie.Poster}">
        </div>
        <div class="info">
            <div>
                <p>Title</p>
                <p class="val">${movie.Title}</p>
                <p>Release Year</p>
                <p class="val">${movie.Year}</p>
            </div>
            <div class="more">
            <p class="more-details"><a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">More Details</a></p>
            </div>
        </div>`;

    // videoContainer.addEventListener("click", () => {
    //   navigateToVideoDetails(video.id.videoId);
    // });

    container.appendChild(videoContainer);
  });
}

inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (inputApi.value.trim() === "" || inputElement.value.trim() === "") {
      // If any field is empty, display an error message
      alert("Both Api and Search string are required fields.");
    } else {
      const searchTerm = inputElement.value;
      fetchSearchResults(searchTerm);
    }
  }
});

buttonElement.addEventListener("click", () => {
  if (inputApi.value.trim() === "" || inputElement.value.trim() === "") {
    // If any field is empty, display an error message
    alert("Both Api and Search String are required fields.");
  } else {
    const searchTerm = inputElement.value;
    fetchSearchResults(searchTerm);
  }
});
