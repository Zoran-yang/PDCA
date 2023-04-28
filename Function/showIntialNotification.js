const notifier = require("node-notifier");
const path = require("path");

function intialNotification(minuteSetting) {
  // Timer was stopped before, so do not start it again
  console.log("intialNotification", minuteSetting);
  if (minuteSetting === "Stop") {
    notifier.notify({
      title: "App do not start",
      message: `Waiting for you to start`,
      icon: path.join(__dirname, "../Asset/Icon.png"),
      sound: true,
      timeout: 3,
      reply: true,
    });
    return;
  }

  let dateString = new Date(
    new Date().getTime() + minuteSetting * 60000
  ).toLocaleString();
  let formattedString = dateString.replace(", ", " - ");
  // show notification when app is started
  notifier.notify({
    title: "App started",
    message: `It will ask you every ${minuteSetting} minutes. Next time is ${formattedString} `,
    icon: path.join(__dirname, "../Asset/Icon.png"),
    sound: true,
    timeout: 3,
    reply: true,
  });
}

module.exports = intialNotification;
