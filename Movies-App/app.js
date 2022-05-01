$("form").on("submit", function (evt) {
  evt.preventDefault();
  const movieTitle = $("input").eq(0).val();
  const rating = $("input").eq(1).val();
  $(".container").append(
    `<div class="movie-container"><h2 class="movie-title">Movie: ${movieTitle}</h2><p class="movie-rating"> Rating: ${rating}</p><button class="remove">X</button></div>`
  );
});

$(".container").on("click", ".remove", function () {
  $(this).parent().remove();
});
