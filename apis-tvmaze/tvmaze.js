"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");

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
    const $show = $(
      `<div data-show-id="${
        show.show.id
      }" class="Show col-md-12 col-lg-6 mb-4 ">
         <div class="media">
           <img
              src=${
                show.show.image === null
                  ? "https://tinyurl.com/tv-missing"
                  : show.show.image.medium
              }
              alt="Bletchly Circle San Francisco"
              class="w-25 mr-3 card-img-top">
           <div class="media-body">
             <h5 class="text-primary">${show.show.name}</h5>
             <div><small>${
               show.show.summary === null ? "" : show.show.summary
             }</small></div>
             <button class="btn btn-outline-light btn-primary btn-sm Show-getEpisodes" id="get-episode-btn">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($show);
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  await populateShows(shows.data);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
// id: 139
async function getEpisodesOfShow(id) {
  const response = await axios.get(
    `https://api.tvmaze.com/shows/${id}/episodes`
  );
  console.log(response);
  return response;
}

/**
data: Array(62)
0:
  airdate: "2012-04-15"
  airstamp: "2012-04-16T02:30:00+00:00"
  airtime: "22:30"
  id: 10820
  image:
    medium: "https://static.tvmaze.com/uploads/images/medium_landscape/15/38639.jpg"
    original: "https://static.tvmaze.com/uploads/images/original_untouched/15/38639.jpg"
    [[Prototype]]: Object
  name: "Pilot"
  number: 1
  rating: {average: 7.2}
  runtime: 30
  season: 1
  summary: "<p>In the premiere of this comedy about twentysomething women navigating their way through life in New York, Hannah swings and misses at two curves when her parents rescind their financial support and she loses her unpaid internship. Meanwhile, Hannah's roommate, Marnie, throws a dinner party for their nomadic friend Jessa, who's returned from yet another journey.</p>"
  type: "regular"
  url: "https://www.tvmaze.com/episodes/10820/girls-1x01-pilot"
 *
 */

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) {
  $episodesArea.empty();

  for (let episode of episodes.data) {
    const $episode = $(`
  <li>${episode.name}</li>
  `);

    $episode.appendTo($("#episodes-list"));
  }
}

$("body").on("click", "#get-episode-btn", async function () {
  const id = $(this).closest(".Show").attr("data-show-id");
  console.log(id);

  const episodes = await getEpisodesOfShow(id);

  await populateEpisodes(episodes);
  //  $episodesArea.css("display", "block");
  $episodesArea.show();
});
