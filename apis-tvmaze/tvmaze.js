'use strict';

const $showsList = $('#shows-list');
const $episodesArea = $('#episodes-area');
const $searchForm = $('#search-form');

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  const response = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${term}`
  );
  console.log(response);
  return response;
}
/* ABOVE CODE SHOULD RETURN SOMETHING LIKE THIS:
[
    {
      id: 1767,
      name: "The Bletchley Circle",
      summary:
        `<p><b>The Bletchley Circle</b> follows the journey of four ordinary
           women with extraordinary skills that helped to end World War II.</p>
         <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
           normal lives, modestly setting aside the part they played in
           producing crucial intelligence, which helped the Allies to victory
           and shortened the war. When Susan discovers a hidden code behind an
           unsolved murder she is met by skepticism from the police. She
           quickly realises she can only begin to crack the murders and bring
           the culprit to justice with her former friends.</p>`,
      image:
          "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
    }
  ]

*/

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const summary = checkSummaryLength(show);
    const $show = $(
      `<div data-show-id="${
        show.show.id
      }" class="Show col-md-3 mb-4 col-sm-6 col-8">
         <div class="card h-100 ">
           <img
              src=${
                show.show.image === null
                  ? 'https://tinyurl.com/tv-missing'
                  : show.show.image.medium
              }
              alt="Bletchly Circle San Francisco"
              class="card-img-top">
          
             <h5 class="card-title text-primary p-3">${show.show.name}</h5>
              <div class="card-body p-3">
             ${summary}</div>
             <button class="btn btn-outline-light btn-primary btn-lg w-auto ms-2 mb-2 Show-getEpisodes" type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal" id="get-episode-btn">
               Episodes
             </button>
           </div>
         </div>
      
      `
    );

    $showsList.append($show);
  }
}

function checkSummaryLength(show) {
  let summary = show.show.summary;
  if (summary !== null) {
    console.log(summary.length);
    if (summary.length > 225) {
      summary = summary.substr(0, 226) + '...';
    }
    return summary;
  }
  return '';
}
/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $('#search-query').val();
  const shows = await getShowsByTerm(term);

  await populateShows(shows.data);
}

$searchForm.on('submit', async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
async function getEpisodesOfShow(id) {
  const response = await axios.get(
    `https://api.tvmaze.com/shows/${id}/episodes`
  );
  console.log(response);
  return response;
}

/** Write a clear docstring for this function... */

/**
 * Given an array of episodes create an li with each episode name, season number and episode number
 *
 */
function populateEpisodes(episodes) {
  for (let episode of episodes.data) {
    const $episode = $(`
  <li>${episode.name} (Season: ${episode.season}, Episode: ${episode.number})</li>
  `);

    $episode.appendTo($('#episodes-list'));
  }
}

/**
 * When the user clicks on the body if the shows are loaded and the id of the element is #get-episode-btn get the id from the data-show-id attribute for each element
 */

$('body').on('click', '#get-episode-btn', async function () {
  const id = $(this).closest('.Show').attr('data-show-id');
  // pass id to search for episodes based on show id
  const episodes = await getEpisodesOfShow(id);
  // adds episodes to DOM modal
  await populateEpisodes(episodes);
});
