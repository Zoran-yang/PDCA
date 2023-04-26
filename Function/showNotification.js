const { BrowserWindow } = require("electron");
const notifier = require("node-notifier");
const path = require("path");

function showNotification() {
  notifier.notify(
    {
      title: "What are you doing?",
      message: "Would you tell us what you are doing?",
      icon: path.join(__dirname, "../Asset/Icon.png"),
      sound: true,
      timeout: 10,
      reply: true,
    },
    (err, response, metadata) => {
      if (response === "activate") {
        if (err) throw err;
        // if (metadata.activationType === 'clicked') {
        //     app.whenReady().then(() => {
        //         createWindow()
        //     })
        //     return; // No need to continue
        // }
        const newWindow = new BrowserWindow({
          width: 700,
          height: 600,
          webPreferences: {
            nodeIntegration: true,
          },
        });
        newWindow.loadFile(
          path.join(__dirname, "../APP/AddUserInfo/dist", "index.html")
        );
        newWindow.on("ready-to-show", () => {
          newWindow.show();
        });

        // Add an event listener for the close event of the window
        newWindow.on("close", (event) => {
          event.preventDefault(); // Prevent the default behavior of the event
          newWindow.hide(); // Hide the window instead of closing it
        });
      } else if (response === "dismissed") {
        console.log("Notification closed");
      }
    }
  );
}

module.exports = showNotification;
