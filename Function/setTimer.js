const showNextTimeNotification = require("./showNextTimeNotification.js");

function setTimer(timerObj, settingObj, callback) {
  // if the minute is "Stop", stop the timer
  if (settingObj.minute === "Stop") return;
  console.log(`setTimer set to ${settingObj.minute} minutes`);
  const now = new Date();
  const Start = getStartTime(settingObj.startTime);
  console.log("setTimer", now.toLocaleString());
  console.log("setTimer", Start.toLocaleString());

  // clear the old timer
  clearInterval(timerObj.timeId);

  // set the new timer by the new starting time and interval
  // the first time is the starting time, and then the interval is the minute
  showNextTimeNotification(Start.getTime() - now.getTime());
  const newTimeId = setTimeout(() => {
    clearTimeout(newTimeId);
    callback();
    const intervalId = setInterval(() => {
      callback();
      showNextTimeNotification(settingObj.minute);
    }, settingObj.minute * 60 * 1000);
    timerObj.timeId = intervalId;
  }, Start.getTime() - now.getTime());
}

function getStartTime(startTime) {
  let now = new Date();
  switch (startTime) {
    case "Start From Now":
      return now;
    case "Start From Next O'clock":
      return getLatestOclock(now);
    case "Start From Next O'clock Or Half":
      return getLatestOclockOrHalf(now);
    case "Start From Next Quarter Hour":
      return getLatestQuarter(now);
    default:
      return now;
  }
}

function getLatestOclock(date) {
  // Set the time to the latest o'clock by rounding the hours up to the nearest integer
  console.log("getLatestOclock", date.getHours() + 1);
  date.setHours(date.getHours() + 1);
  // Set the minutes, seconds, and milliseconds to 0 to get the exact o'clock time
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // Return the new date object
  return date;
}

function getLatestOclockOrHalf(date) {
  // Round up the hours to the nearest integer
  const hours = date.getHours();
  console.log("getLatestOclockOrHalf", hours);
  // Set the minutes, seconds, and milliseconds to 0 to get the exact o'clock time
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  // If the minutes are greater than or equal to 30, add 30 minutes to get the half past time
  if (date.getMinutes() >= 30) {
    date.setHours(hours + 1, 0, 0, 0);
  } else {
    date.setHours(hours, 30, 0, 0);
  }
  // Return the new date object
  return date;
}

function getLatestQuarter(date) {
  // Round up the hours to the nearest integer
  let minutes = date.getMinutes();
  let hours = date.getHours();
  date.setHours(minutes > 52 ? (hours === 23 ? 0 : ++hours) : hours);
  date.setMinutes((parseInt((minutes + 7.5) / 15) * 15) % 60);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

module.exports = setTimer;
