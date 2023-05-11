import DisplaySopArea from "../Component/Container - Sop/DisplaySopArea.jsx";
import DisplayTaskInfoArea from "../Component/Container - taskInfo/DisplayTaskInfoArea.jsx";
import ReviseTaskInfosTab from "../Component/ReviseTaskInfosTab.jsx";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from "../Component/mainTheme-reviseUserInfo.jsx";
// import "./App.css";
import { CssBaseline } from "@mui/material";

function App() {
  const [tab, setTab] = useState(0);

  switch (tab) {
    case 0:
      return (
        <>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <DisplayTaskInfoArea />
            <ReviseTaskInfosTab setValue={setTab} value={tab} />
          </ThemeProvider>
        </>
      );
    case 1:
      return (
        <>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <DisplaySopArea />
            <ReviseTaskInfosTab setValue={setTab} value={tab} />
          </ThemeProvider>
        </>
      );
  }
}

export default App;
