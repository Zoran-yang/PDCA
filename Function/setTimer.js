function setTimer(timeId, minute, startingTime, callback) {
  const now = new Date();
  const Start = chooseStartTime(startingTime);
  console.log(`Set to ${minute} minutes`);
  // clear the old timer
  clearInterval(timeId);
  // set the new timer by the new starting time and interval
  timeId = setTimeout(() => {
    callback();
    timeId = setInterval(() => {
      callback();
    }, minute * 60 * 1000);
  }, Start.getTime() - now.getTime());
}

function chooseStartTime(startingTime) {
  switch (startingTime) {
    case "From Now":
      return now;
    case "From o'clock":
      return getLatestOclock(now);
    case "From o'clock or half":
      return getLatestOclockOrHalf(now);
    default:
      return now;
  }
}

function getLatestOclock(date) {
  // Set the time to the latest o'clock by rounding the hours up to the nearest integer
  date.setHours(Math.ceil(date.getHours()));
  // Set the minutes, seconds, and milliseconds to 0 to get the exact o'clock time
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // Return the new date object
  return date;
}

function getLatestOclockOrHalf(date) {
  // Round up the hours to the nearest integer
  const hours = Math.round(date.getHours());
  // Set the minutes, seconds, and milliseconds to 0 to get the exact o'clock time
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // If the minutes are greater than or equal to 30, add 30 minutes to get the half past time
  if (date.getMinutes() >= 30) {
    date.setHours(hours, 0, 0, 0);
  } else {
    date.setHours(hours, 30, 0, 0);
  }
  // Return the new date object
  return date;
}

module.exports = setTimer;
