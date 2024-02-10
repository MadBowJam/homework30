// movie.js
const createMovieElement = (movie) => {
  const { Poster, Title, Year, Type } = movie;

  const movieDiv = document.createElement('div');
  movieDiv.classList.add('movie');
  movieDiv.innerHTML = `
    <img src="${Poster !== 'N/A' ? Poster : '../assets/img/noImg.svg'}" alt="${Title}">
    <div class="movieDescription">
      <h2 title="${Title}">${Title}</h2>
      <p>Year: ${Year}</p>
      <p>Type: ${Type}</p>
    </div>
  `;

  return movieDiv;
};

export { createMovieElement };
