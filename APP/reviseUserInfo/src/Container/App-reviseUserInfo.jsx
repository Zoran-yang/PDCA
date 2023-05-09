import DisplaySopArea from "../Component/Container - Sop/DisplaySopArea.jsx";
import DisplayTaskInfoArea from "../Component/Container - taskInfo/DisplayTaskInfoArea.jsx";
import ReviseTaskInfosTab from "../Component/ReviseTaskInfosTab.jsx";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from "../../../AddUserInfo/src/CommonTools/Component/mainTheme.jsx";

function App() {
  const [tab, setTab] = useState(0);

  switch (tab) {
    case 0:
      return (
        <>
          {/* <ThemeProvider theme={mainTheme}> */}
          <DisplayTaskInfoArea />
          <ReviseTaskInfosTab setValue={setTab} value={tab} />
          {/* </ThemeProvider> */}
        </>
      );
    case 1:
      return (
        <>
          {/* <ThemeProvider theme={mainTheme}> */}
          <DisplaySopArea />
          <ReviseTaskInfosTab setValue={setTab} value={tab} />
          {/* </ThemeProvider> */}
        </>
      );
  }
}

export default App;
