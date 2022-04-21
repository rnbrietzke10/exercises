/*
Write a function called countdown that accepts a number as a parameter and every 1000 milliseconds decrements the value and console.logs it. Once the value is 0 it should log “DONE!” and stop.
*/

const countdown = function (num) {
  let value = num + 1;
  const interval = setInterval(() => {
    value--;
    if (value !== 0) {
      console.log(value);
    }
    if (value === 0) {
      console.log('Done!');
      clearInterval(interval);
    }
  }, 1000);
};

countdown(4);
