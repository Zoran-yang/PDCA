const notifier = require("node-notifier");
const path = require("path");

function intialNotification(minuteSetting) {
  // Timer was stopped before, so do not start it again
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

  // show notification when app is started
  notifier.notify({
    title: "App started",
    message: `It will ask you every ${minuteSetting} minutes`,
    icon: path.join(__dirname, "../Asset/Icon.png"),
    sound: true,
    timeout: 3,
    reply: true,
  });
}

module.exports = intialNotification;
