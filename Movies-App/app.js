$("form").on("submit", function (evt) {
  evt.preventDefault();
  let movieTitle = $("input").eq(0);
  let rating = $("input").eq(1);
  $(".container").append(
    `<div class="movie-container"><h2 class="movie-title">Movie: ${movieTitle.val()}</h2><p class="movie-rating"> Rating: ${rating.val()}</p><button class="remove">X</button></div>`
  );
  movieTitle.val("");
  rating.val("");
});

$(".container").on("click", ".remove", function () {
  $(this).parent().remove();
});
