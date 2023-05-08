import DisplaySopArea from "../Component/Container - Sop/DisplaySopArea.jsx";
import DisplayTaskInfoArea from "../Component/Container - taskInfo/DisplayTaskInfoArea.jsx";
import ReviseTaskInfosTab from "../Component/ReviseTaskInfosTab.jsx";
import { useState } from "react";

function App() {
  const [tab, setTab] = useState(0);

  switch (tab) {
    case 0:
      return (
        <>
          <DisplayTaskInfoArea />
          <ReviseTaskInfosTab setValue={setTab} value={tab} />
        </>
      );
    case 1:
      return (
        <>
          <DisplaySopArea />
          <ReviseTaskInfosTab setValue={setTab} value={tab} />
        </>
      );
  }
}

export default App;
