console.log("Let's get this party started!");

const searchBtn = document.getElementById('submit-btn');
const searchInput = document.getElementById('search-input');

$(searchBtn).on('click', function (e) {
  e.preventDefault();
  getGiphy();
  searchInput.value = '';
});

async function getGiphy() {
  const apiKey = 'rpcqJxPZVFFMjGmk0WgIY430u7b18Pcw';
  let input = searchInput.value;
  const response = await axios.get(
    `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=1&q=${input}&bundle=sticker_layering`
  );
  createGiphyHTML(response.data.data[0].images.downsized_medium.url);
}

function createGiphyHTML(url) {
  $('main').append($(`<img src=${url} />`));
}

const removeBtn = document.querySelector('#remove-btn');
$(removeBtn).on('click', function (e) {
  e.preventDefault();
  const imgs = document.querySelectorAll('img');
  for (let img of imgs) {
    $(img).remove();
  }
});
