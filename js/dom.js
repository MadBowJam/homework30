// dom.js
const createElement = (tagName, attributes = {}) => {
  const element = document.createElement(tagName);
  Object.assign(element, attributes);
  return element;
};

const createSearchInput = () => createElement('input', {
  type: 'text',
  placeholder: 'Enter movie title...',
  className: 'search-input'
});

const createResultsContainer = () => createElement('div', {
  className: 'results'
});

const createShowMoreButton = () => createElement('button', {
  textContent: 'Show More',
  style: 'display: none;', // Initially hidden
  className: 'show-more-btn'
});

const createHeading = () => createElement('h1', {
  textContent: 'Movie Search',
  className: 'heading'
});

export { createSearchInput, createResultsContainer, createShowMoreButton, createHeading };