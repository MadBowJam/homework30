// Create the search input element
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Enter movie title...';
searchInput.classList.add('search-input');

// Create the results container
const resultsDiv = document.createElement('div');
resultsDiv.classList.add('results');

// Create the "Show More" button
const showMoreButton = document.createElement('button');
showMoreButton.textContent = 'Show More';
showMoreButton.style.display = 'none'; // Initially hidden
showMoreButton.classList.add('show-more-btn');

// Create the heading element
const heading = document.createElement('h1');
heading.textContent = 'Movie Search';
heading.classList.add('heading');

// Append the elements to the body of the document
document.body.appendChild(heading);
document.body.appendChild(searchInput);
document.body.appendChild(resultsDiv);
document.body.appendChild(showMoreButton);

// Dynamically generate CSS styles
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
  }

  .heading {
    text-align: center;
  }

  .search-input {
    font-size: 1.5rem;
    max-width: 1200px; /* Add max width */
    width: 80%; /* Set width to 80% */
    padding: 10px; /* Add padding for better visual appearance */
    margin: 20px auto; /* Center the input horizontally and add some margin */
    display: block; /* Make the input a block-level element */
  }

  .results {
    max-width: 1224px;
    width: calc(80% + 20px);;
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }

  .movie {
    width: calc(20% - 10px);
    margin-bottom: 20px; /* Add margin between movie items */
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease; /* Add smooth transition effect */
    margin-right: 10px; /* Add right margin for every fourth movie element */
  }

  .movie:nth-child(5n) {
    margin-right: 0; /* Remove right margin for every fifth movie element */
  }

  @media (max-width: 1300px) {
    .movie {
      min-width: calc(25% - 10px); /* Add min width when viewport width is less than 1300px */
    }

    .movie:nth-child(5n) {
      margin-right: 10px;
    }

    .movie:nth-child(4n) {
      margin: 0 0 20px 2px;
    }
  }

  @media (max-width: 1000px) {
    .movie {
      min-width: calc(33% - 7px); /* Add min width when viewport width is less than 1300px */
    }

    .movie:nth-child(4n) {
      margin: 0 10px 20px 0;
    }

    .movie:nth-child(3n) {
      margin-right: 0;
    }
  }

  @media (max-width: 700px) {
    .movie {
      min-width: calc(50% - 7px); /* Add min width when viewport width is less than 1300px */
    }

    .movie:nth-child(2n) {
      margin-left: 10px;
    }

    .movie:nth-child(1n) {
      margin-right: 0;
    }
  }

  @media (max-width: 500px) {
    .movie {
      min-width: 100%; /* Add min width when viewport width is less than 1300px */
    }

    .movie img {
      height: unset !important;
    }

    .movie {
      margin: 0 0 10px 0 !important;
    }

  }

  .movie img {
    width: 100%;
    height: 340px;
    border-bottom: 1px solid #ddd;
  }

  .movieDescription {
    padding: 10px;
  }

  .movieDescription h2 {
    white-space: nowrap; /* Prevent text from wrapping */
    overflow: hidden; /* Hide any overflow */
    text-overflow: ellipsis; /* Add ellipsis (...) for overflow text */
    margin: 0; /* Remove default margin */
  }

  /* Remove top margin from the first child of .movieDescription */
  .movieDescription > :first-child {
    margin-top: 0;
  }

  /* Remove bottom margin from the last child of .movieDescription */
  .movieDescription > :last-child {
    margin-bottom: 0;
  }

  .show-more-btn {
    font-size: 1.5rem;
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Add transition for hover effect */
  }

  .show-more-btn:hover {
    background-color: #0056b3;
  }
`;
document.head.appendChild(style);

// Add event listener to search input
searchInput.addEventListener('input', debounce(searchMovies, 500));

let currentPage = 1;
let totalResults = 0;

async function searchMovies() {
  currentPage = 1; // Reset currentPage to 1
  const query = searchInput.value;
  if (query.length < 3) {
    resultsDiv.innerHTML = '';
    return;
  }

  const response = await fetch(`https://www.omdbapi.com/?s=${query}&page=${currentPage}&apikey=678c5362`);
  const data = await response.json();

  if (data.Response === "True") {
    totalResults = parseInt(data.totalResults);
    resultsDiv.innerHTML = '';
    const movies = data.Search.slice(0, 10);
    movies.forEach(movie => {
      const movieDiv = createMovieElement(movie);
      resultsDiv.appendChild(movieDiv);
    });

    showMoreButton.style.display = totalResults > 10 ? 'block' : 'none';
  } else {
    resultsDiv.innerHTML = 'No results found';
    showMoreButton.style.display = 'none';
  }
}


const createMovieElement = (movie) => {
  const movieDiv = document.createElement('div');
  movieDiv.classList.add('movie');

  const img = document.createElement('img');
  img.src = movie.Poster !== 'N/A' ? movie.Poster : '../assets/img/noImg.svg';
  img.alt = movie.Title;

  const detailsDiv = document.createElement('div');
  detailsDiv.classList.add('movieDescription');
  const h2 = document.createElement('h2');
  h2.textContent = movie.Title;
  h2.setAttribute('title', movie.Title)
  const yearPara = document.createElement('p');
  yearPara.textContent = `Year: ${movie.Year}`;
  const typePara = document.createElement('p');
  typePara.textContent = `Type: ${movie.Type}`;

  detailsDiv.appendChild(h2);
  detailsDiv.appendChild(yearPara);
  detailsDiv.appendChild(typePara);

  movieDiv.appendChild(img);
  movieDiv.appendChild(detailsDiv);

  return movieDiv;
};

// Add event listener to "Show More" button
showMoreButton.addEventListener('click', async () => {
  currentPage++;
  const query = searchInput.value;
  const response = await fetch(`https://www.omdbapi.com/?s=${query}&page=${currentPage}&apikey=678c5362`);
  const data = await response.json();
  const movies = data.Search.slice(0, 10);
  movies.forEach(movie => {
    const movieDiv = createMovieElement(movie);
    resultsDiv.appendChild(movieDiv);
  });
  if ((currentPage * 10) >= totalResults) {
    showMoreButton.style.display = 'none';
  }
});

// Function to debounce input
function debounce(func, timeout) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, timeout);
  };
}






// DOM.js
// movies.js