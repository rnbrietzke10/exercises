// Math.random();
/*
Write a function called randomGame that selects a random number between 0 and 1 every 1000 milliseconds and each time that a random number is picked, add 1 to a counter. If the number is greater than .75, stop the timer and console.log the number of tries it took before we found a number greater than .75. */

function randomGame() {
  let count = 1;
  const interval = setInterval(function () {
    let randNum = Math.random();
    if (randNum < 0.75) {
      count++;
    } else {
      console.log(count);
      clearInterval(interval);
    }
  }, 1000);
}

randomGame();
