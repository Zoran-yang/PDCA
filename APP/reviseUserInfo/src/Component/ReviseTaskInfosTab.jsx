import * as React from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RuleIcon from "@mui/icons-material/Rule";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { useEffect, useRef } from "react";

import { ThemeProvider } from "@mui/material/styles";
// import mainTheme from "../../../AddUserInfo/src/CommonTools/Component/mainTheme.jsx";
import mainTheme from "./mainTheme-reviseUserInfo.jsx";
// import "./ReviseTaskInfosTab.css";

export default function ReviseTaskInfosTab({ value, setValue }) {
  const ref = useRef(null);
  // const [messages, setMessages] = useState(() => refreshMessages());

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    // setMessages(refreshMessages());
  }, [value]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{ pb: 7 }} ref={ref}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Task Information"
              icon={<PermContactCalendarIcon />}
            />
            <BottomNavigationAction label="Task SOP" icon={<RuleIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
