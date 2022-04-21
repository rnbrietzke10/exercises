function getRandomRGB() {
  let r = Math.floor(Math.random() * 266);
  let g = Math.floor(Math.random() * 266);
  let b = Math.floor(Math.random() * 266);
  return `rgb(${r}, ${g}, ${b})`;
}

const letters = document.querySelectorAll('.letter');

const interval = setInterval(function () {
  for (let letter of letters) {
    letter.style.color = getRandomRGB();
  }
}, 1000);
